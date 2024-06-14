import type { TaskListsRepository } from "~/repositories/TaskListsRepository.ts";
import type { User } from "~/schema.ts";

export class TaskListsService {
  constructor(private taskListsRepository: TaskListsRepository) {}

  getAllTaskLists = (userId: User["id"]) => {
    return this.taskListsRepository.getAllTaskLists(userId);
  };
}
