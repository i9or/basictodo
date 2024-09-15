import { Hono } from "hono";

import { HOME_ROUTE } from "~/routers/routes.ts";
import { MainPage } from "~/views/main-page.tsx";
import { PrivacyPolicyPage } from "~/views/privacy-policy-page.tsx";
import { TermsOfUsePage } from "~/views/terms-of-use-page.tsx";

export const homeRouter = new Hono()
  .get(HOME_ROUTE, (c) => {
    return c.html(<MainPage />);
  })
  .get("/terms-of-use", (c) => {
    return c.html(<TermsOfUsePage />);
  })
  .get("/privacy-policy", (c) => {
    return c.html(<PrivacyPolicyPage />);
  });
