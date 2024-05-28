import { sql } from "drizzle-orm";
import { Hono } from "hono";
import { serveStatic } from "hono/bun";

import { db } from "~/db";
import { ENV } from "~/env";
import { hotReload } from "~/hotReload";
import { httpLogger } from "~/middlewares/httpLogger";
import { isDevelopment } from "~/utils/environment";
import { logger } from "~/utils/logger";
import { MainPage } from "~/views/MainPage";
import { SignInPage } from "~/views/SignInPage";

const query = sql`SELECT "hello world from SQLite" as text`;
const result = db.get<{ text: string }>(query);
logger.debug({ result });

const app = new Hono();

app.use(httpLogger());
app.use("/public/*", serveStatic({ root: "./" }));
app.get("/sign-in", (c) => c.html(<SignInPage />));
app.get("/", (c) => c.html(<MainPage />));

const server = Bun.serve({
  fetch: app.fetch,
  port: ENV.port,
});

if (isDevelopment()) {
  hotReload();
}

logger.info(`🌭 Listening on ${server.url}`);
