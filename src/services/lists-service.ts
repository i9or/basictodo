import { selectAllLists } from "~/repositories/lists-repository";

export const getAllLists = (userId: /*User["id"]*/ string) => {
  return selectAllLists(userId);
};
