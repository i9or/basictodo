import { Hono } from "hono";

import { logger } from "~/utils/logger.ts";
import { SignInPage } from "~/views/sign-in-page.tsx";
import { SignUpPage } from "~/views/sign-up-page.tsx";

export const authRouter = new Hono()
  .get("/sign-in", (c) => {
    return c.html(<SignInPage />);
  })
  .post("/sign-in", async (c) => {
    const body = await c.req.parseBody();
    logger.debug(body);

    return c.redirect("/");
  })
  .get("/sign-up", (c) => {
    return c.html(<SignUpPage />);
  })
  .post("/sign-up", (c) => {
    return c.html(<div>POST Sign Up Page: Not implemented</div>);
  })
  .delete("/sign-out", (c) => {
    // TODO: Sign out current user by removing session here
    return c.redirect(`/sign-in`);
  });
