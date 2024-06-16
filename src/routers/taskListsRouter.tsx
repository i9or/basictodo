import { Hono } from "hono";

import { taskListsService } from "~/application.ts";
import { isEmpty } from "~/utils/isEmpty.ts";
import { TaskListsPage } from "~/views/TaskListsPage.tsx";

export const taskListsRouter = new Hono().get("/", async (c) => {
  // TODO: User id should be retrieved from session
  const taskLists = await taskListsService.getAllTaskLists(1);

  if (isEmpty(taskLists)) {
    return c.html("No task lists exist...");
  }

  return c.html(<TaskListsPage taskLists={taskLists} />);
});
