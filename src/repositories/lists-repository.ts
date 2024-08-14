// import { db } from "~/db.ts";

// TODO: add proper types
export const selectAllLists = (
  userId: /*User["id"]*/ string,
): { name: string }[] => {
  // return this.db.select().from(taskLists).where(eq(taskLists.userId, userId));
  return [{ name: `some list for ${userId}` }];
};
