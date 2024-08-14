import { Hono } from "hono";

import { HTTP_NOT_FOUND } from "~/constants.ts";

export const listsRouter = new Hono().get("/", (c) => {
  c.status(HTTP_NOT_FOUND);

  return c.html("<p>Not implemented</p>");
});
