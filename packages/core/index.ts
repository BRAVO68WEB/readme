import "dotenv/config";
import "./config/fetch";

import { serve } from "@hono/node-server";
import { WebSocketServer } from 'ws';
import { createServer } from 'node:http'
import { URL } from 'url';

import DBClient from "./providers/database-client";
import { app } from "./routes";

DBClient.init();

if (DBClient.getUsers().length === 0) {
	console.log("❌ No users are present!");
	
	console.log("Please a new user using the `user:create` script.");
}

const server = createServer()

serve({
	fetch: app.fetch,
	port: 4000,
	createServer: () => server,
});

const wss = new WebSocketServer({
	noServer: true,
});

wss.on('connection', function connection(ws) {
	ws.on('error', console.error);
  
	ws.on('message', function message(data) {
	  console.log('received: %s', data);
	});
  
	ws.send('something');
});

server.on('upgrade', function upgrade(request, socket, head) {
	const { pathname } = new URL(request.url as string);

	if (pathname === '/api/v1/streaming') {
		wss.handleUpgrade(request, socket, head, function done(ws) {
			wss.emit('connection', ws, request);
		});
	} else {
		socket.destroy();
	}
});
