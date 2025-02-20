import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { jsxRenderer } from "hono/jsx-renderer";
import { nanoid } from "nanoid";

import { csrfProtection, setCSRFToken } from "~/middlewares/csrf-protection";
import { httpLogger } from "~/middlewares/http-logger";
import { authRouter } from "~/routers/auth-router";
import { homeRouter } from "~/routers/home-router";
import { logger } from "~/utils/logger";
import { ErrorPage } from "~/views/error-page";
import { Layout } from "~/views/layout";

export const server = new Hono();

server.use(httpLogger());
server.use("/public/*", serveStatic({ root: "./" }));

server.use("*", async (c, next) => {
  const token = setCSRFToken(c);
  c.set("csrfToken", token);

  return await next();
});

server.use(
  jsxRenderer(({ children, title, className }, c) => {
    const token = c.get("csrfToken");

    return (
      <Layout title={title} className={className} csrfToken={token}>
        {children}
      </Layout>
    );
  }),
);

server.use(csrfProtection);

server.route("/", authRouter);
server.route("/", homeRouter);

server.onError((err, c) => {
  const requestId = nanoid();
  logger.error({ err, requestId }, "Internal server error");

  return c.render(
    <ErrorPage
      requestId={requestId}
      title="500"
      subTitle="Something went wrong..."
      errorMessage="We're experiencing some technical difficulties on our servers."
      description="Our team has been notified and is working to fix the issue. Please try again later."
    >
      <button
        class="btn btn-primary btn-lg px-4 gap-3"
        onclick="window.location.reload()"
      >
        Refresh Page
      </button>
      <a href="/" class="btn btn-outline-secondary btn-lg px-4">
        Back to Home
      </a>
    </ErrorPage>,
    {
      title: "Internal Server Error",
      className: "min-vh-100 d-flex align-items-center py-5",
    },
  );
});

server.notFound((c) => {
  const requestId = nanoid();
  logger.error({ url: c.req.url, requestId }, "Page not found");

  return c.render(
    <ErrorPage
      requestId={requestId}
      title="404"
      subTitle="Page not found..."
      errorMessage="The page you're looking for doesn't exist or has been moved."
      description="Please check the URL or try navigating to our homepage."
    >
      <a class="btn btn-primary btn-lg px-4" href="/">
        Back to Home
      </a>
      <button
        class="btn btn-outline-secondary btn-lg px-4"
        onclick="history.back()"
      >
        Go Back
      </button>
    </ErrorPage>,
    {
      title: "Not Found",
      className: "min-vh-100 d-flex align-items-center py-5",
    },
  );
});
