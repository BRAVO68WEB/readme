import { WebSocketServer } from "ws";

const wss = new WebSocketServer({
	port: 4002
});

wss.on("connection", (ws) => {
	ws.on("error", console.error);
  
	ws.on("message", (data) => {
		console.log("received: %s", data);

        ws.send(data);
	});
  
	ws.send("something");
});

console.log("WebSocket server listening on port 4002");