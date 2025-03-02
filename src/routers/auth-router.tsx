import { Hono } from "hono";
import { getSignedCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";

import { ENV } from "~/env";
import {
  DASHBOARD_ROUTE,
  HOME_ROUTE,
  SIGN_IN_ROUTE,
  SIGN_OUT_ROUTE,
  SIGN_UP_ROUTE,
} from "~/routers/routes";
import {
  type SignInFormData,
  signInUserSchema,
  type SignUpFormData,
  signUpUserSchema,
} from "~/schemas/user-schemas";
import { authenticate, createAccount } from "~/services/auth-service";
import {
  createSession,
  deleteSession,
  deleteSessionTokenCookie,
  getSessionTokenCookie,
  SESSION_TOKEN_COOKIE,
  setSessionTokenCookie,
} from "~/services/sessions-service";
import { generateToken } from "~/utils/generate-token";
import { logger } from "~/utils/logger";
import { notNullNorUndefined } from "~/utils/predicates";
import { resolveInvalidFields } from "~/utils/resolve-invalid-fields";
import { SIGN_IN_PAGE_TITLE, SignInPage } from "~/views/sign-in-page";
import { SignUpPage } from "~/views/sign-up-page";
import { SignUpSuccessPage } from "~/views/sign-up-success-page";

export const authRouter = new Hono()
  .post(SIGN_OUT_ROUTE, async (c) => {
    const sessionToken = await getSessionTokenCookie(c);

    if (notNullNorUndefined(sessionToken) && sessionToken !== false) {
      deleteSession(sessionToken);
      deleteSessionTokenCookie(c);
      c.set("user", undefined); // just in case
    }

    return c.redirect(HOME_ROUTE);
  })
  .use(
    createMiddleware(async (c, next) => {
      const sessionToken = await getSignedCookie(
        c,
        ENV.secret,
        SESSION_TOKEN_COOKIE,
      );

      if (notNullNorUndefined(sessionToken)) {
        logger.warn(
          "User tried to access authentication router while being authenticated",
        );

        return c.redirect(DASHBOARD_ROUTE);
      }

      return await next();
    }),
  )
  .get(SIGN_IN_ROUTE, (c) => {
    return c.render(<SignInPage />, { title: SIGN_IN_PAGE_TITLE });
  })
  .post(SIGN_IN_ROUTE, async (c) => {
    const formData = await c.req.parseBody<SignInFormData>();
    const result = signInUserSchema.safeParse(formData);

    if (result.success) {
      const { user } = await authenticate(
        result.data.email,
        result.data.password,
      );

      if (notNullNorUndefined(user)) {
        const token = generateToken();
        const session = createSession(token, user.id);

        // TODO: check "remember me" flag
        await setSessionTokenCookie(c, token, session.expiresAt);

        return c.redirect(DASHBOARD_ROUTE);
      }
    }

    return c.render(<SignInPage isWrongCredentials formData={formData} />, {
      title: SIGN_IN_PAGE_TITLE,
    });
  })
  .get(SIGN_UP_ROUTE, (c) => {
    return c.render(<SignUpPage />);
  })
  .post(SIGN_UP_ROUTE, async (c) => {
    const formData = await c.req.parseBody<SignUpFormData>();
    const result = signUpUserSchema.safeParse(formData);

    if (result.success) {
      const { newUserId, isUserExist } = await createAccount(result.data);
      if (isUserExist) {
        return c.render(<SignUpPage formData={formData} isUserExists />);
      }

      if (notNullNorUndefined(newUserId)) {
        return c.render(<SignUpSuccessPage />);
      }

      throw new Error("Something went wrong, received undefined newUserId...");
    } else {
      logger.error(
        {
          formData: {
            ...formData,
            password: "[REDACTED]",
            confirmPassword: "[REDACTED]",
          },
          validationErrors: result.error.flatten(),
        },
        "Failed sign up form validation",
      );

      return c.render(
        <SignUpPage
          formData={formData}
          invalidFields={resolveInvalidFields(result.error)}
        />,
      );
    }
  });
