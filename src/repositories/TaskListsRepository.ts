import { eq } from "drizzle-orm";
import type { BunSQLiteDatabase } from "drizzle-orm/bun-sqlite";

import { Repository } from "~/framework/Repository.ts";
import { type TaskList, taskLists, type User } from "~/schema.ts";

export class TaskListsRepository extends Repository {
  constructor(db: BunSQLiteDatabase) {
    super(db);
  }

  getAllTaskLists = (userId: User["id"]): Promise<TaskList[]> => {
    return this.db.select().from(taskLists).where(eq(taskLists.userId, userId));
  };
}
