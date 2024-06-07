import type { BunSQLiteDatabase } from "drizzle-orm/bun-sqlite";

import { Repository } from "~/framework/Repository.ts";
import { type List, taskLists } from "~/schema.ts";

export class TaskListsRepository extends Repository {
  constructor(db: BunSQLiteDatabase) {
    super(db);
  }

  // TODO: should be parametrized by user id
  getAllTaskLists = (): Promise<List[]> => {
    return this.db.select().from(taskLists);
  };
}
