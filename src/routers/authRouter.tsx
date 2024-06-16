import { Hono } from "hono";

import { SignInPage } from "~/views/SignInPage.tsx";

export const authRouter = new Hono()
  .get("/sign-in", (c) => {
    return c.html(<SignInPage />);
  })
  .delete("/sign-out", (c) => {
    // TODO: Sign out current user by removing session here
    return c.redirect(`/sign-in`);
  });
