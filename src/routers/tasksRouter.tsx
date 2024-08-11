import { Hono } from "hono";

import { HTTP_NOT_FOUND } from "~/constants.ts";
import { db } from "~/db.ts";

const n = 0;

export const tasksRouter = new Hono().get("/", (c) => {
  c.status(HTTP_NOT_FOUND);

  return c.html("<p>Not implemented</p>");
});
