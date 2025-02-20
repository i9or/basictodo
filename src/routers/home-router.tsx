import { Hono } from "hono";

import {
  HOME_ROUTE,
  PRIVACY_POLICY_ROUTE,
  TERMS_OF_USE_ROUTE,
} from "~/routers/routes";
import { MainPage } from "~/views/main-page";
import { PrivacyPolicyPage } from "~/views/privacy-policy-page";
import { TermsOfUsePage } from "~/views/terms-of-use-page";

export const homeRouter = new Hono()
  .get(HOME_ROUTE, (c) => {
    return c.render(<MainPage />);
  })
  .get(TERMS_OF_USE_ROUTE, (c) => {
    return c.render(<TermsOfUsePage />, { title: "Terms of Use" });
  })
  .get(PRIVACY_POLICY_ROUTE, (c) => {
    return c.render(<PrivacyPolicyPage />, { title: "Privacy Policy" });
  });
