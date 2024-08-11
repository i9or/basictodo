import type { TaskListsRepository } from "~/repositories/TaskListsRepository.ts";

export class TaskListsService {
  constructor(private taskListsRepository: TaskListsRepository) {}

  getAllTaskLists = (userId: /*User["id"]*/ string) => {
    return this.taskListsRepository.getAllTaskLists(userId);
  };
}
