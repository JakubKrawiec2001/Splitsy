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

export const expenseSchema = z.object({
  transactionType: z.enum(["expense", "revenue"], {
    message: `Select type of transaction`,
  }),
  amount: z
    .number({ invalid_type_error: "The amount must be a number" })
    .min(1, "The amount must be greater than 0"),
  description: z
    .string()
    .min(3, { message: "The description should contain at least 3 characters" })
    .max(15, {
      message: "The description should contain a maximum of 15 characters",
    }),
  category: z.enum(
    [
      "Health",
      "Leisure",
      "Home",
      "Cafe",
      "Education",
      "Gifts",
      "Groceries",
      "Family",
      "Workout",
      "Transportation",
      "Work",
      "Restaurants",
      "Other",
    ],
    { message: `Select or add a category` }
  ),
  color: z
    .string()
    .regex(/^#[0-9A-F]{6}$/i, "Invalid color format")
    .min(1, "Select a category color"),
  icon: z.string().min(1, { message: "You must select an icon" }),
});
