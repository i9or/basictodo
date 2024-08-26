import { ZodError } from "zod";

import { getKeys } from "~/utils/get-keys.ts";

export const resolveInvalidFields = <T>(err: ZodError<T>) => {
  return new Set(getKeys(err.flatten().fieldErrors));
};
