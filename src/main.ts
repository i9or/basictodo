import { Hono } from "hono";
import { sql } from "drizzle-orm";

import { db } from "./db.ts";

const query = sql`SELECT "hello world from SQLite" as text`;
const result = db.get<{ tex: string }>(query);
console.info({ result });

const app = new Hono();
app.get("/", (c) => c.text("Hello Bun!"));

Bun.serve({
  fetch: app.fetch,
  port: 1337,
});
