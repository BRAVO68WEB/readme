import { Hono } from 'hono';
import { user } from './user.routes';
import pkg from '../package.json';

import { serveStatic } from '@hono/node-server/serve-static'
import { poweredBy } from 'hono/powered-by'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'

const app = new Hono();

// Middlewares
app.use("*", poweredBy());
app.use("*", logger());
app.use("*", cors({
    origin: "*",
    allowMethods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    maxAge: 86400,
}));

// Routes
app.route('/user', user);

// Static Files
app.use('/uplaods', serveStatic({ root: './uploads'}))

// Health Check
app.get('/health', (ctx) => {
    return ctx.json({
        status: 'OK',
    })
})

// Root Route
app.get('/', (ctx) => {
    return ctx.json({
        name: pkg.name,
        version: pkg.version,
    })
})

export {
    app
};