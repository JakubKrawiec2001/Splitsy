import { z } from "zod";

export const formSchema = (type: string) =>
  z
    .object({
      username:
        type === "sign-in"
          ? z.string().optional()
          : z.string().min(3, {
              message: "Username must contain at least 3 characters",
            }),
      email: z.string().email().min(2, {
        message: "Invalid email",
      }),
      password: z.string().min(8, {
        message: "Password must contain at least 8 characters",
      }),
      confirmedPassword:
        type === "sign-in" ? z.string().optional() : z.string().min(5),
    })
    .refine(
      (data) =>
        type === "sign-up" ? data.password === data.confirmedPassword : true,
      {
        message: "Passwords don't match",
        path: ["confirmedPassword"],
      }
    );
