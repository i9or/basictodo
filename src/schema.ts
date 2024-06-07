import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

export const taskLists = sqliteTable("task_lists", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
});

export const tasks = sqliteTable(
  "tasks",
  {
    id: integer("id").primaryKey(),
    summary: text("summary").notNull(),
    completed: integer("completed", { mode: "boolean" })
      .default(false)
      .notNull(),
    listId: integer("list_id")
      .references(() => taskLists.id)
      .notNull(),
  },
  (self) => ({
    summaryIndex: uniqueIndex("summary_index").on(self.summary),
  }),
);

export type TaskList = typeof taskLists.$inferSelect;
export type Task = typeof tasks.$inferSelect;
