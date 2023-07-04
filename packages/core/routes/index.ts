import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { poweredBy } from "hono/powered-by";

import pkg from "../package.json";
import { user } from "./user.routes";
import { post } from "./post.routes";

const app = new Hono();

// Middlewares
app.use("*", poweredBy());
app.use("*", logger());
app.use(
	"*",
	cors({
		origin: "*",
		allowMethods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
		maxAge: 86_400,
	}),
);

// Routes
app.route("/users", user);
app.route("/posts", post);

// Static Files
app.use("/uplaods", serveStatic({ root: "./uploads" }));

// Health Check
app.get("/health", (ctx) => {
	return ctx.json({
		status: "OK",
	});
});

// Root Route
app.get("/", (ctx) => {
	return ctx.json({
		name: pkg.name,
		version: pkg.version,
	});
});

export { app };
