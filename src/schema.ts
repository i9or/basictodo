import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

export const lists = sqliteTable("lists", {
  id: integer("id").primaryKey(),
  name: text("name"),
});

export const tasks = sqliteTable(
  "tasks",
  {
    id: integer("id").primaryKey(),
    summary: text("summary").notNull(),
    listId: integer("list_id")
      .references(() => lists.id)
      .notNull(),
  },
  (self) => ({
    summaryIdx: uniqueIndex("nameIdx").on(self.summary),
  }),
);

export type List = typeof lists.$inferSelect;
export type Task = typeof tasks.$inferSelect;
