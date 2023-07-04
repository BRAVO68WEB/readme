import "dotenv/config";
import "./config/fetch";

import { serve } from "@hono/node-server";

import DBClient from "./providers/database-client";
import { app } from "./routes";

DBClient.init();

if (DBClient.getUsers().length === 0) {
	console.log("❌ No users are present!");
	
	console.log("Please a new user using the `user:create` script.");
	process.exit(1);
}

serve({
	fetch: app.fetch,
	port: 4000,
});
