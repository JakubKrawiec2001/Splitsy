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
	category: z.object({
		id: z.string(),
		label: z.string(),
		icon: z.string(),
		color: z.string(),
	}),
});
export const goalSchema = z.object({
	label: z
		.string()
		.min(3, { message: "The description should contain at least 3 characters" })
		.max(15, {
			message: "The description should contain a maximum of 15 characters",
		}),
	goal: z
		.number({ invalid_type_error: "The amount must be a number" })
		.min(1, "The amount must be greater than 0"),
});
