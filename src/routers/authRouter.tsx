import { Hono } from "hono";

import { SignInPage } from "~/views/SignInPage.tsx";

export const authRouter = new Hono();

authRouter.get("/sign-in", (c) => {
  return c.html(<SignInPage />);
});

authRouter.delete("/sign-out", (c) => {
  // TODO: Sign out current user by removing session

  return c.redirect(`/sign-in`);
});
