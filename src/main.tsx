import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { sql } from "drizzle-orm";
import { WebSocketServer } from "ws";

import { db } from "./db.ts";
import { MainPage } from "./views/MainPage.tsx";
import { SignInPage } from "./views/SignInPage.tsx";

const query = sql`SELECT "hello world from SQLite" as text`;
const result = db.get<{ text: string }>(query);
console.info({ result });

const app = new Hono();
app.use("/public/*", serveStatic({ root: "./" }));
app.get("/sign-in", (c) => c.html(<SignInPage />));
app.get("/", (c) => c.html(<MainPage />));

const server = Bun.serve({
  fetch: app.fetch,
  port: 1337,
});

const wss = new WebSocketServer({ port: 1338 });

console.info(`🌭 Listening on ${server.url}`);
