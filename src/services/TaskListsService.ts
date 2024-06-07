import { Service } from "~/framework/Service.ts";
import type { TaskListsRepository } from "~/repositories/TaskListsRepository.ts";

export class TaskListsService extends Service {
  constructor(private taskListsRepository: TaskListsRepository) {
    super();
  }

  getAllTaskLists = () => {
    return this.taskListsRepository.getAllTaskLists();
  };
}
