import { selectAllLists } from "~/repositories/lists-repository.ts";

export const getAllLists = (userId: /*User["id"]*/ string) => {
  return selectAllLists(userId);
};
