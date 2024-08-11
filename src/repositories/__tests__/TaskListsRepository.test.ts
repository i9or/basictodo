import type { Database } from "bun:sqlite";
import { describe, expect, it, mock } from "bun:test";

import { TaskListsRepository } from "../TaskListsRepository.ts";

class DbMock {
  select = mock(() => this);
  from = mock(() => this);
  where = mock((): TaskList[] => [
    {
      userId: 1,
      id: 1,
      name: "mock list 1",
    },
  ]);
}

describe("TaskListsRepository", () => {
  it("should return all the task lists", async () => {
    const dbMock = new DbMock();
    const taskListsRepository = new TaskListsRepository(
      dbMock as unknown as Database,
    );

    expect(taskListsRepository.getAllTaskLists("1")).toStrictEqual([
      {
        userId: 1,
        id: 1,
        name: "mock list 1",
      },
    ]);

    expect(dbMock.select).toBeCalledTimes(1);
    expect(dbMock.from).toBeCalledTimes(1);
    expect(dbMock.where).toBeCalledTimes(1);
  });
});
