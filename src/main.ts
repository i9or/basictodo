import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { html } from "hono/html";

import { App } from "~/App.ts";
import { AuthController } from "~/controllers/AuthController.tsx";
import { HomeController } from "~/controllers/HomeController.tsx";
import { TaskListsController } from "~/controllers/TaskListsController.tsx";
import { TasksController } from "~/controllers/TasksController.ts";
import { ENV } from "~/env.ts";
import { hotReload } from "~/hotReload.ts";
import { httpLogger } from "~/middlewares/httpLogger.ts";
import { isDevelopment } from "~/utils/environment.ts";
import { logger } from "~/utils/logger.ts";
import { Layout } from "~/views/Layout.ts";

const server = new Hono();

server.use(httpLogger());
server.use("/public/*", serveStatic({ root: "./" }));

server.route(AuthController.path, App.authController.router);
server.route(TaskListsController.path, App.taskListsController.router);
server.route(HomeController.path, App.homeController.router);
server.route(TasksController.path, App.tasksController.router);

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
