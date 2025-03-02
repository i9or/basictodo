import { z } from "zod";

export const sessionSchema = z.object({
  id: z.string().nonempty(),
  userId: z.number().nonnegative().min(0),
  expiresAt: z.date(),
});

export type Session = z.infer<typeof sessionSchema>;
