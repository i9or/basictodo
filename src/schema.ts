import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

export const users = sqliteTable(
  "users",
  {
    id: integer("id").primaryKey(),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    email: text("email").notNull().unique(),
  },
  (self) => ({
    emailIndex: uniqueIndex("email_index").on(self.email),
  }),
);

export const taskLists = sqliteTable("task_lists", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
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
    userId: integer("user_id")
      .references(() => users.id)
      .notNull(),
  },
  (self) => ({
    summaryIndex: uniqueIndex("summary_index").on(self.summary),
  }),
);

export type TaskList = typeof taskLists.$inferSelect;
export type TaskListDto = typeof taskLists.$inferInsert;

export type Task = typeof tasks.$inferSelect;
export type TaskDto = typeof tasks.$inferInsert;

export type User = typeof users.$inferSelect;
export type UserDto = typeof users.$inferInsert;
