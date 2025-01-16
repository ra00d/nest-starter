import { z } from "zod";
export const loginInSchema = z.object({
	email: z
		.string({
			invalid_type_error: "email is invalid",
		})
		.email("invalid email ")
		.trim(),
	password: z.string().min(6).trim(),
});
export type TLogin = z.infer<typeof loginInSchema>;

export const signUpSchema = z
	.object({
		name: z.string().trim().min(1),
		email: z
			.string({
				invalid_type_error: "email is invalid",
			})
			.email("invalid email ")
			.trim(),
		password: z.string().min(6).trim(),
		passwordConfirmation: z.string().min(6).trim(),
	})
	.refine((args) =>
		args.passwordConfirmation !== args.password
			? {
					path: "passwordConfirmation",
					message: "passwords does not match",
				}
			: args,
	);
export type TSignUp = z.infer<typeof signUpSchema>;
