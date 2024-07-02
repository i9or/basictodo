import { describe, expect, it, mock } from "bun:test";

import type { TaskListsRepository } from "~/repositories/TaskListsRepository.ts";
import { TaskListsService } from "~/services/TaskListsService.ts";

class TaskListsRepositoryMock {
  getAllTaskLists = mock().mockResolvedValue([
    { userId: 1, id: 1, name: "mock list 1" },
  ]);
}

describe("TaskListsService", () => {
  it("should return all the task lists", async () => {
    const taskListsRepositoryMock = new TaskListsRepositoryMock();
    const tasksListService = new TaskListsService(
      taskListsRepositoryMock as unknown as TaskListsRepository,
    );

    expect(await tasksListService.getAllTaskLists(1)).toStrictEqual([
      {
        userId: 1,
        id: 1,
        name: "mock list 1",
      },
    ]);
    expect(taskListsRepositoryMock.getAllTaskLists).toBeCalledTimes(1);
    expect(taskListsRepositoryMock.getAllTaskLists).toBeCalledWith(1);
  });
});
