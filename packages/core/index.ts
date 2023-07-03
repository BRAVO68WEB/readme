import "dotenv/config";
import "./config/fetch";

import { serve } from "@hono/node-server";

import DBClient from "./providers/database-client";
import { app } from "./routes";

DBClient.init();

serve({
	fetch: app.fetch,
	port: 4000,
});
