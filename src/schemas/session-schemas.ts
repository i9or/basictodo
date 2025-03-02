import { z } from "zod";

import { sessionSchema } from "~/models/session";
import { userSchema } from "~/models/user";

export const sessionValidationResultSchema = z.union([
  z.object({
    session: sessionSchema,
    user: userSchema,
  }),
  z.object({
    session: z.null(),
    user: z.null(),
  }),
]);

export type SessionValidationResult = z.infer<
  typeof sessionValidationResultSchema
>;
