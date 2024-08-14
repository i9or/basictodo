import { Hono } from "hono";

import { MainPage } from "~/views/main-page.tsx";

export const homeRouter = new Hono().get("/", (c) => {
  return c.html(<MainPage />);
});
