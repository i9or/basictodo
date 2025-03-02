import type { Context } from "hono";
import { getCookie, setCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
import { HTTPException } from "hono/http-exception";
import { nanoid } from "nanoid";

import { HOME_ROUTE } from "~/routers/routes";
import { isProduction } from "~/utils/environment";
import { isNullOrUndefined } from "~/utils/predicates";

const CSRF_TOKEN_COOKIE = "csrf_token";
export const CSRF_HEADER = "x-csrf-token";
export const CSRF_FORM_FIELD = "_csrf";

export const csrfProtection = createMiddleware(
  async function csrfProtectionMiddleware(c, next) {
    if (["GET", "HEAD", "OPTIONS"].includes(c.req.method)) {
      return await next();
    }

    const cookieToken = getCookie(c, CSRF_TOKEN_COOKIE);
    if (isNullOrUndefined(cookieToken)) {
      throw new HTTPException(403, {
        message: "Missing CSRF token",
      });
    }

    const headerToken = c.req.header(CSRF_HEADER);
    const formData = await c.req.parseBody().catch(() => null);
    const formToken = formData?.[CSRF_FORM_FIELD];

    const providedToken = headerToken ?? formToken;

    if (isNullOrUndefined(providedToken) || cookieToken !== providedToken) {
      throw new HTTPException(403, {
        message: "Invalid CSRF token",
      });
    }

    return await next();
  },
);

export const setCSRFToken = (c: Context) => {
  const token = nanoid(32);
  setCookie(c, CSRF_TOKEN_COOKIE, token, {
    httpOnly: true,
    secure: isProduction(),
    sameSite: "Lax",
    path: HOME_ROUTE,
  });

  return token;
};
