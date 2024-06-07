import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { csrf } from "hono/csrf";
import { html } from "hono/html";
import { nanoid } from "nanoid";

import { ENV } from "~/env";
import { hotReload } from "~/hot-reload";
import { httpLogger } from "~/middlewares/http-logger";
import { authRouter } from "~/routers/auth-router";
import { homeRouter } from "~/routers/home-router";
import { isDevelopment } from "~/utils/environment";
import { logger } from "~/utils/logger";
import { Layout } from "~/views/layout";

const server = new Hono();

server.use(httpLogger());
server.use("/public/*", serveStatic({ root: "./" }));

server.use(
  "*",
  csrf({
    origin: [
      "https://basictodo.com",
      ...(isDevelopment() ? ["http://localhost:3000"] : []),
    ],
  }),
);

server.route("/", authRouter);
server.route("/", homeRouter);

server.onError((err, c) => {
  const errorId = nanoid();
  logger.error({ err, errorId }, "Internal server error");

  return c.html(
    Layout({
      title: "Internal Server Error",
      className: "min-vh-100 d-flex align-items-center py-5",
      children: html`<main class="container">
        <article class="text-center mx-auto">
          <header>
            <p class="display-1 fw-bold text-danger mb-4">500</p>
            <h1 class="display-4 mb-5">Something went wrong...</h1>
          </header>

          <section class="text-secondary mb-5">
            <p class="lead">
              We're experiencing some technical difficulties on our servers.
            </p>
            <p class="mb-4">
              Our team has been notified and is working to fix the issue. Please
              try again later.
            </p>
          </section>

          <nav class="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <button
              class="btn btn-primary btn-lg px-4 gap-3"
              onclick="window.location.reload()"
            >
              Refresh Page
            </button>
            <a href="/" class="btn btn-outline-secondary btn-lg px-4">
              Back to Home
            </a>
          </nav>

          <footer class="mt-4">
            <p class="text-muted small">
              Error ID: <span id="errorId">${errorId}</span>
            </p>
          </footer>
        </article>
      </main>`,
    }),
  );
});

server.notFound((c) => {
  const requestId = nanoid();
  logger.error({ url: c.req.url, errorId: requestId }, "Page not found");

  return c.html(
    Layout({
      title: "Internal Server Error",
      className: "min-vh-100 d-flex align-items-center py-5",
      children: html`<main class="container">
        <article class="text-center mx-auto">
          <header>
            <p class="display-1 fw-bold text-primary mb-4">404</p>
            <h1 class="display-4 mb-5">Page not found...</h1>
          </header>

          <section class="text-secondary mb-5">
            <p class="lead">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <p class="mb-4">
              Please check the URL or try navigating to our homepage.
            </p>
          </section>

          <nav class="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <a class="btn btn-primary btn-lg px-4" href="/"> Back to Home </a>
            <button
              class="btn btn-outline-secondary btn-lg px-4"
              onclick="history.back()"
            >
              Go Back
            </button>
          </nav>

          <footer class="mt-4">
            <p class="text-muted small">
              Request ID: <span id="errorId">${requestId}</span>
            </p>
          </footer>
        </article>
      </main>`,
    }),
  );
});

const serverInstance = Bun.serve({
  fetch: server.fetch,
  port: ENV.port,
});

if (isDevelopment()) {
  hotReload();
}

logger.info(`🚀 Listening on ${serverInstance.url}`);
