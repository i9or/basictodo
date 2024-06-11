import { Service } from "~/framework/Service.ts";
import type { TaskListsRepository } from "~/repositories/TaskListsRepository.ts";
import type { User } from "~/schema.ts";

export class TaskListsService extends Service {
  constructor(private taskListsRepository: TaskListsRepository) {
    super();
  }

  getAllTaskLists = (userId: User["id"]) => {
    return this.taskListsRepository.getAllTaskLists(userId);
  };
}
