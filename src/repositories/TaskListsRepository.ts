import { eq } from "drizzle-orm";
import type { BunSQLiteDatabase } from "drizzle-orm/bun-sqlite";

import { type TaskList, taskLists, type User } from "~/schema.ts";

export class TaskListsRepository {
  constructor(private db: BunSQLiteDatabase) {}

  getAllTaskLists = (userId: User["id"]): Promise<TaskList[]> => {
    return this.db.select().from(taskLists).where(eq(taskLists.userId, userId));
  };
}
