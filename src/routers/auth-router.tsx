import { Hono } from "hono";

// import { setSignedCookie } from "hono/cookie";
import { HOME_ROUTE, SIGN_IN_ROUTE, SIGN_UP_ROUTE } from "~/routers/routes";
import {
  type SignInFormData,
  signInUserSchema,
  type SignUpFormData,
  signUpUserSchema,
} from "~/schemas/user-schemas";
import { createAccount } from "~/services/auth-service";
import { logger } from "~/utils/logger";
import { notNullNorUndefined } from "~/utils/predicates";
import { resolveInvalidFields } from "~/utils/resolve-invalid-fields";
import { SignInPage } from "~/views/sign-in-page";
import { SignUpPage } from "~/views/sign-up-page";

export const authRouter = new Hono()
  .get(SIGN_IN_ROUTE, (c) => {
    return c.html(<SignInPage />);
  })
  .post(SIGN_IN_ROUTE, async (c) => {
    const formData = await c.req.parseBody<SignInFormData>();
    const result = signInUserSchema.safeParse(formData);

    if (result.success) {
      // TODO: Verify credentials
      //       Set cookie
      //       Redirect to main page
      return c.html(<SignInPage />);
    }

    return c.html(<SignInPage isWrongCredentials formData={formData} />);
  })
  .get(SIGN_UP_ROUTE, (c) => {
    return c.html(<SignUpPage />);
  })
  .post(SIGN_UP_ROUTE, async (c) => {
    const formData = await c.req.parseBody<SignUpFormData>();
    const result = signUpUserSchema.safeParse(formData);

    if (result.success) {
      const { newUserId, isUserExist } = await createAccount(result.data);
      if (isUserExist) {
        return c.html(<SignUpPage formData={formData} isUserExists />);
      }

      if (notNullNorUndefined(newUserId)) {
        // await setSignedCookie(
        //   c,
        //   "signedInUser",
        //   `${newUserId}`,
        //   "sUpErSeCrEt/123!",
        //   {
        //     path: "/",
        //     secure: true,
        //     httpOnly: true,
        //     sameSite: "Strict",
        //     maxAge: 399 * 24 * 60 * 60, // 399 days in seconds
        //     expires: new Date(new Date().getTime() + 399 * 24 * 60 * 60 * 1000),
        //   },
        // );
      } else {
        throw new Error(
          "Something went wrong, received undefined newUserId...",
        );
      }

      return c.redirect(HOME_ROUTE);
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
