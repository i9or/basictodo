import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { showRoutes } from "hono/dev";
import { HTTPException } from "hono/http-exception";
import { jsxRenderer } from "hono/jsx-renderer";
import { nanoid } from "nanoid";

import { HTTP_FORBIDDEN, HTTP_UNAUTHORIZED } from "~/constants";
import { ENV } from "~/env";
import { csrfProtection, setCSRFToken } from "~/middlewares/csrf-protection";
import { httpLogger } from "~/middlewares/http-logger";
import { authRouter } from "~/routers/auth-router";
import { dashboardRouter } from "~/routers/dashboard-router";
import { homeRouter } from "~/routers/home-router";
import { DASHBOARD_ROUTE, HOME_ROUTE, SIGN_IN_ROUTE } from "~/routers/routes";
import { isDevelopment } from "~/utils/environment";
import { logger } from "~/utils/logger";
import { ErrorPage } from "~/views/error-page";
import { Layout } from "~/views/layout";

export const server = new Hono();

server.use(httpLogger);

server.use("/public/*", serveStatic({ root: "./" }));

server.use("*", async function setCSRFTokenMiddleware(c, next) {
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

server.route(DASHBOARD_ROUTE, dashboardRouter);

server.route("/", authRouter);
server.route("/", homeRouter);

server.onError((err, c) => {
  const requestId = nanoid();
  const url = c.req.url;

  if (err instanceof HTTPException) {
    switch (err.status) {
      case HTTP_FORBIDDEN:
        logger.error(
          {
            url,
            requestId,
          },
          err.message,
        );

        return c.render(
          <ErrorPage
            requestId={requestId}
            title="403"
            subTitle="Access forbidden..."
            errorMessage="You don't have permission to access this resource."
            description="If you believe this is a mistake, please contact our support team."
          >
            <a class="btn btn-primary btn-lg px-4" href="/">
              <i class="bi bi-house me-2" aria-hidden="true" />
              Back to Home
            </a>
          </ErrorPage>,
          {
            title: "Forbidden",
          },
        );
      case HTTP_UNAUTHORIZED:
        logger.error(
          {
            url,
            requestId,
          },
          err.message,
        );

        return c.render(
          <ErrorPage
            requestId={requestId}
            title="401"
            subTitle="Unauthorized access..."
            errorMessage="Please sign in to access this resource."
            description="If you're already signed in, your session may have expired. Please try signing in again."
          >
            <a class="btn btn-primary btn-lg px-4" href={SIGN_IN_ROUTE}>
              <i class="bi bi-box-arrow-in-right me-2" aria-hidden="true" />
              Sign In
            </a>
          </ErrorPage>,
          {
            title: "Unauthorized",
          },
        );
      default:
        logger.error(
          {
            url,
            requestId,
          },
          `Unsupported error HTTPException status: ${err.status}`,
        );
    }
  }

  logger.error({ err, url, requestId }, "Internal server error");

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
        <i class="bi bi-arrow-clockwise me-2" aria-hidden="true" />
        Refresh Page
      </button>
      <a href="/" class="btn btn-outline-secondary btn-lg px-4" role="button">
        <i class="bi bi-house me-2" aria-hidden="true" />
        Back to Home
      </a>
    </ErrorPage>,
    {
      title: "Internal Server Error",
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
      <a class="btn btn-primary btn-lg px-4" href={HOME_ROUTE} role="button">
        <i class="bi bi-house me-2" aria-hidden="true" />
        Back to Home
      </a>
      <button
        class="btn btn-outline-secondary btn-lg px-4"
        onclick="history.back()"
      >
        <i class="bi bi-arrow-left me-2" aria-hidden="true" />
        Go Back
      </button>
    </ErrorPage>,
    {
      title: "Not Found",
    },
  );
});

if (isDevelopment() && ENV.showRoutes) {
  showRoutes(server, {
    verbose: true,
  });
}
