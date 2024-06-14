import { Hono } from "hono";

import { taskListsService } from "~/application.ts";
import { isEmpty } from "~/utils/isEmpty.ts";
import { TaskListsPage } from "~/views/TaskListsPage.tsx";

// TODO: remove before merge
const FIRST_USER_ID_FOR_NOW = 1;

export const taskListsRouter = new Hono();

taskListsRouter.get("/", async (c) => {
  const taskLists = await taskListsService.getAllTaskLists(
    FIRST_USER_ID_FOR_NOW,
  );

  if (isEmpty(taskLists)) {
    return c.html("No task lists exist...");
  }

  return c.html(<TaskListsPage taskLists={taskLists} />);
});
