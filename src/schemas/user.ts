import { z } from "zod";

export type SignUpFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTermsAndPrivacy?: string;
};

export const signUpUserSchema = z
  .object({
    firstName: z.string().min(1).max(100),
    lastName: z.string().min(1).max(100),
    email: z.string().email(),
    password: z.string().min(8).max(100),
    confirmPassword: z.string(),
    acceptTermsAndPrivacy: z.preprocess(
      (value) => value === "on",
      z.literal<boolean>(true),
    ),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords don't match",
        path: ["confirmPassword"],
      });
    }
  });

export type SignUpUserDto = z.infer<typeof signUpUserSchema>;

export type SignInFormData = {
  email?: string;
  password?: string;
  rememberMe?: string;
};

export const signInUserSchema = z.object({
  email: z.string(),
  password: z.string(),
  rememberMe: z.preprocess((value) => value === "on", z.boolean()),
});
