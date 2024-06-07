import { Controller } from "~/framework/Controller.ts";
import type { TaskListsService } from "~/services/TaskListsService.ts";
import { TaskListsPage } from "~/views/TaskListsPage.tsx";

export class TaskListsController extends Controller {
  constructor(private taskListsService: TaskListsService) {
    super();

    this.router.get("/", ...this.index);
  }

  index = this.factory.createHandlers(async (c) => {
    const taskLists = await this.taskListsService.getAllTaskLists();

    return c.html(<TaskListsPage taskLists={taskLists} />);
  });

  static get path() {
    return "/task-lists";
  }
}
