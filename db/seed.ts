import { database } from "~/database.ts";
import { taskLists, tasks, users } from "~/schema.ts";
import { logger } from "~/utils/logger.ts";

const resolvedUsers = await database.select().from(users);

if (resolvedUsers.length === 0) {
  const [user] = await database
    .insert(users)
    .values([
      {
        firstName: "John",
        lastName: "Doe",
        email: "noreply@basictodo.com",
      },
    ])
    .returning();

  const [firstList, secondList] = await database
    .insert(taskLists)
    .values([
      { name: "Long term tasks", userId: user.id },
      { name: "Backlog", userId: user.id },
    ])
    .returning();

  await database.insert(tasks).values([
    {
      summary: "Add user entity",
      listId: firstList.id,
      userId: user.id,
    },
    {
      summary: "Add sessions",
      listId: firstList.id,
      userId: user.id,
    },
    {
      summary: "Update Dockerfile to support SQLite DB",
      listId: secondList.id,
      userId: user.id,
    },
  ]);

  const result = await database.select().from(tasks);
  logger.debug({ result });
}
