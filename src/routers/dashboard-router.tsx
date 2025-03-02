import { Hono } from "hono";

import { sessionValidation } from "~/middlewares/session-validation";
import { ROOT_ROUTE, SIGN_OUT_ROUTE } from "~/routers/routes";
import { CsrfToken } from "~/views/components/csrf-token";

export const dashboardRouter = new Hono().get(
  ROOT_ROUTE,
  sessionValidation,
  (c) => {
    const user = c.get("user");

    return c.render(
      <>
        <div>Welcome, {user?.firstName ?? "Username"}!</div>
        <form action={SIGN_OUT_ROUTE} method="post">
          <CsrfToken />
          <button type="submit">Log out</button>
        </form>
      </>,
      {
        title: "Dashboard",
      },
    );
  },
);
