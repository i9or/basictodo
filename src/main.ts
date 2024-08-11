import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { html } from "hono/html";

import { ENV } from "~/env.ts";
import { hotReload } from "~/hotReload.ts";
import { httpLogger } from "~/middlewares/httpLogger.ts";
import { authRouter } from "~/routers/authRouter.tsx";
import { homeRouter } from "~/routers/homeRouter.tsx";
import { isDevelopment } from "~/utils/environment.ts";
import { logger } from "~/utils/logger.ts";
import { Layout } from "~/views/Layout.ts";

const server = new Hono();

server.use(httpLogger());
server.use("/public/*", serveStatic({ root: "./" }));

server.route("/", authRouter);
server.route("/", homeRouter);

server.onError((err, c) => {
  logger.error(err);

  return c.html(Layout({ children: html`<h1>Something went wrong...</h1>` }));
});

const serverInstance = Bun.serve({
  fetch: server.fetch,
  port: ENV.port,
});

if (isDevelopment()) {
  hotReload();
}

logger.info(`🌭 Listening on ${serverInstance.url}`);
