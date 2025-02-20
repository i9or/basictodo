import type { Context } from "hono";
import { getCookie, setCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
import { nanoid } from "nanoid";

import { isProduction } from "~/utils/environment";
import { logger } from "~/utils/logger";
import { isNullOrUndefined } from "~/utils/predicates";
import { ErrorPage } from "~/views/error-page";

const CSRF_TOKEN_COOKIE = "csrf_token";
export const CSRF_HEADER = "x-csrf-token";
export const CSRF_FORM_FIELD = "_csrf";

const FORBIDDEN_PAGE_TITLE = "Forbidden";

type ForbiddenErrorPageProps = {
  requestId: string;
};

const ForbiddenErrorPage = ({ requestId }: ForbiddenErrorPageProps) => {
  return (
    <ErrorPage
      requestId={requestId}
      title="403"
      subTitle="Access forbidden..."
      errorMessage="You don't have permission to access this resource."
      description="If you believe this is a mistake, please contact our support team."
    >
      <a class="btn btn-primary btn-lg px-4" href="/">
        Back to Home
      </a>
    </ErrorPage>
  );
};

export const csrfProtection = createMiddleware(async (c, next) => {
  if (["GET", "HEAD", "OPTIONS"].includes(c.req.method)) {
    return await next();
  }

  const cookieToken = getCookie(c, CSRF_TOKEN_COOKIE);
  if (isNullOrUndefined(cookieToken)) {
    const requestId = nanoid();
    logger.error(
      {
        url: c.req.url,
        cookieToken,
        requestId,
      },
      "Missing CSRF token",
    );

    return c.render(<ForbiddenErrorPage requestId={requestId} />, {
      title: FORBIDDEN_PAGE_TITLE,
    });
  }

  const headerToken = c.req.header(CSRF_HEADER);
  const formData = await c.req.parseBody().catch(() => null);
  const formToken = formData?.[CSRF_FORM_FIELD];

  const providedToken = headerToken ?? formToken;

  if (isNullOrUndefined(providedToken) || cookieToken !== providedToken) {
    const requestId = nanoid();
    logger.error(
      {
        url: c.req.url,
        cookieToken,
        headerToken,
        requestId,
      },
      "Invalid CSRF token",
    );

    return c.render(<ForbiddenErrorPage requestId={requestId} />, {
      title: FORBIDDEN_PAGE_TITLE,
    });
  }

  return await next();
});

export const setCSRFToken = (c: Context) => {
  const token = nanoid(32);
  setCookie(c, CSRF_TOKEN_COOKIE, token, {
    httpOnly: true,
    secure: isProduction(),
    sameSite: "Lax",
  });

  return token;
};
