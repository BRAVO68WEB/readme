package main

import (
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"
	"strings"

	"github.com/gorilla/websocket"
)

func main() {
	// Create a reverse proxy for the HTTP server
	httpProxy := NewReverseProxy("http://localhost:4000")

	// Start the proxy server
	log.Println("Proxy server listening on :8080")
	err := http.ListenAndServe(":8080", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if strings.HasPrefix(r.URL.Path, "/api/") {
			// Route HTTP requests to the HTTP server
			httpProxy.ServeHTTP(w, r)
		} else if strings.HasPrefix(r.URL.Path, "/streaming") {
			// Upgrade WebSocket requests and proxy them
			websocketProxy(w, r)
		} else {
			http.NotFound(w, r)
		}
	}))

	if err != nil {
		log.Fatal("Proxy server error: ", err)
	}
}

// NewReverseProxy creates a new reverse proxy for the given target URL
func NewReverseProxy(target string) *httputil.ReverseProxy {
	url, err := url.Parse(target)
	if err != nil {
		log.Fatal("Invalid target URL: ", err)
	}

	proxy := httputil.NewSingleHostReverseProxy(url)

	// Modify request headers if needed
	proxy.Director = func(req *http.Request) {
		req.Host = url.Host
		req.URL.Host = url.Host
		req.URL.Scheme = url.Scheme
		req.Header.Set("X-Forwarded-Host", req.Header.Get("Host"))
		req.Header.Set("X-Origin-Host", url.Host)
	}

	return proxy
}

// WebSocket proxy implementation using Gorilla WebSocket library
func websocketProxy(w http.ResponseWriter, r *http.Request) {
	backendURL := "ws://localhost:4002" // Replace with your WebSocket server URL
	upgrader := websocket.Upgrader{
		CheckOrigin: func(r *http.Request) bool {
			// Allow all origins for simplicity, you can customize this check as per your requirements
			return true
		},
	}

	backendConn, _, err := websocket.DefaultDialer.Dial(backendURL+r.URL.Path, nil)
	if err != nil {
		log.Println("WebSocket connection error:", err)
		http.Error(w, "WebSocket connection failed", http.StatusInternalServerError)
		return
	}

	defer backendConn.Close()

	frontendConn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("WebSocket upgrade error:", err)
		return
	}

	defer frontendConn.Close()

	go func() {
		for {
			messageType, message, err := backendConn.ReadMessage()
			if err != nil {
				log.Println("WebSocket backend read error:", err)
				break
			}

			err = frontendConn.WriteMessage(messageType, message)
			if err != nil {
				log.Println("WebSocket frontend write error:", err)
				break
			}
		}
	}()

	for {
		messageType, message, err := frontendConn.ReadMessage()
		if err != nil {
			log.Println("WebSocket frontend read error:", err)
			break
		}

		err = backendConn.WriteMessage(messageType, message)
		if err != nil {
			log.Println("WebSocket backend write error:", err)
			break
		}
	}
}
