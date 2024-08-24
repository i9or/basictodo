import { Hono } from "hono";

import { MainPage } from "~/views/main-page.tsx";
import { PrivacyPolicyPage } from "~/views/privacy-policy-page.tsx";
import { TermsOfUsePage } from "~/views/terms-of-use-page.tsx";

export const homeRouter = new Hono()
  .get("/", (c) => {
    return c.html(<MainPage />);
  })
  .get("/terms-of-use", (c) => {
    return c.html(<TermsOfUsePage />);
  })
  .get("/privacy-policy", (c) => {
    return c.html(<PrivacyPolicyPage />);
  });
