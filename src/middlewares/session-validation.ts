import { createMiddleware } from "hono/factory";
import { HTTPException } from "hono/http-exception";

import {
  deleteSessionTokenCookie,
  getSessionTokenCookie,
  setSessionTokenCookie,
  validateSessionToken,
} from "~/services/sessions-service";
import { isNullOrUndefined } from "~/utils/predicates";

export const sessionValidation = createMiddleware(
  async function sessionValidationMiddleware(c, next) {
    const sessionToken = await getSessionTokenCookie(c);

    if (sessionToken === false) {
      throw new HTTPException(403, {
        message: "Cookie signature check failed",
      });
    }

    if (isNullOrUndefined(sessionToken)) {
      throw new HTTPException(401, {
        message: "Unauthorized",
      });
    }

    const { session, user } = validateSessionToken(sessionToken);
    if (isNullOrUndefined(session)) {
      deleteSessionTokenCookie(c);

      throw new HTTPException(401, { message: "Session expired" });
    }

    if (isNullOrUndefined(user)) {
      throw new Error(
        "Something went wrong, session validation returned user as null...",
      );
    }

    // Extend session token cookie expiration
    await setSessionTokenCookie(c, sessionToken, session.expiresAt);

    // Pass user details down to the request chain
    c.set("user", user);

    return await next();
  },
);
