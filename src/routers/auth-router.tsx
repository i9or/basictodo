import { Hono } from "hono";

import { SIGN_IN_ROUTE } from "~/routers/routes.ts";
import {
  type SignInFormData,
  signInUserSchema,
  type SignUpFormData,
  signUpUserSchema,
} from "~/schemas/user.ts";
import { createAccount } from "~/services/auth-service.ts";
import { logger } from "~/utils/logger.ts";
import { resolveInvalidFields } from "~/utils/resolve-invalid-fields.ts";
import { SignInPage } from "~/views/sign-in-page.tsx";
import { SignUpPage } from "~/views/sign-up-page.tsx";

export const authRouter = new Hono()
  .get(SIGN_IN_ROUTE, (c) => {
    return c.html(<SignInPage />);
  })
  .post(SIGN_IN_ROUTE, async (c) => {
    const formData = await c.req.parseBody<SignInFormData>();
    const result = signInUserSchema.safeParse(formData);

    if (result.success) {
      // Verify credentials
      // Set cookie
      // Redirect to main page
    }

    return c.html(<SignInPage isWrongCredentials formData={formData} />);
  })
  .get("/sign-up", (c) => {
    return c.html(<SignUpPage />);
  })
  .post("/sign-up", async (c) => {
    const formData = await c.req.parseBody<SignUpFormData>();
    const result = signUpUserSchema.safeParse(formData);

    if (result.success) {
      if (await createAccount(result.data)) {
        return c.redirect(SIGN_IN_ROUTE);
      } else {
        return c.html(<SignUpPage formData={formData} isUserExist />);
      }
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

      return c.html(
        <SignUpPage
          formData={formData}
          invalidFields={resolveInvalidFields(result.error)}
        />,
      );
    }
  })
  .delete("/sign-out", (c) => {
    // TODO: Sign out current user by removing session here
    return c.redirect(SIGN_IN_ROUTE);
  });
