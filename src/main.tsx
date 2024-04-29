import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { sql } from "drizzle-orm";

import { db } from "./db.ts";
import { MainPage } from "./views/MainPage.tsx";

const query = sql`SELECT "hello world from SQLite" as text`;
const result = db.get<{ text: string }>(query);
console.info({ result });

const app = new Hono();
app.use("/public/*", serveStatic({ root: "./" }));
app.get("/", (c) => c.html(<MainPage />));

Bun.serve({
  fetch: app.fetch,
  port: 1337,
});
