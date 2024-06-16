import { Hono } from "hono";

import { HTTP_NOT_FOUND } from "~/utils/constants.ts";

export const tasksRouter = new Hono().get("/", (c) => {
  c.status(HTTP_NOT_FOUND);

  return c.html("<p>Not implemented</p>");
});
