import type { Database } from "bun:sqlite";

export class TaskListsRepository {
  constructor(private db: Database) {}

  // TODO: add proper types
  getAllTaskLists = (userId: /*User["id"]*/ string): { name: string }[] => {
    // return this.db.select().from(taskLists).where(eq(taskLists.userId, userId));
    return [{ name: `some list for ${userId}` }];
  };
}
