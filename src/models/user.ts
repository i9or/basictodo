import { z } from "zod";

export const userSchema = z.object({
  id: z.number().nonnegative().min(0),
  email: z.string().nonempty(),
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
  password: z.string().nonempty().optional(),
});

export type User = z.infer<typeof userSchema>;
