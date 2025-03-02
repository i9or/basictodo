import { z } from "zod";

export const userSchema = z.object({
  id: z.number().nonnegative().min(0),
  email: z.string().nonempty(),
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
});

export const userWithPasswordSchema = userSchema.extend({
  password: z.string().nonempty(),
});

export type User = z.infer<typeof userSchema>;
export type UserWithPassword = z.infer<typeof userWithPasswordSchema>;
