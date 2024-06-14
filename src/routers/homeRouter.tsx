import { Hono } from "hono";

import { MainPage } from "~/views/MainPage.tsx";

export const homeRouter = new Hono();

homeRouter.get("/", (c) => {
  return c.html(<MainPage />);
});
