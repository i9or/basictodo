import { Controller } from "~/framework/Controller.ts";
import type { TaskListsService } from "~/services/TaskListsService.ts";
import { TaskListsPage } from "~/views/TaskListsPage.tsx";

const FIRST_USER_ID_FOR_NOW = 0;

export class TaskListsController extends Controller {
  constructor(private taskListsService: TaskListsService) {
    super();

    this.router.get("/", ...this.index);
  }

  index = this.factory.createHandlers(async (c) => {
    const taskLists = await this.taskListsService.getAllTaskLists(
      FIRST_USER_ID_FOR_NOW,
    );

    return c.html(<TaskListsPage taskLists={taskLists} />);
  });

  static get path() {
    return "/task-lists";
  }
}
