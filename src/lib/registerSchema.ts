import { string, z } from "zod";
export const registerSchema = z
  .object({
    userName: string()
      .min(5, "Please use more then 5 characters")
      .max(16, "Please use less then 16 characters"),
    email: z.string().email("Please enter valid email"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(24, "Password can be 24 characters long")
      .regex(
        new RegExp(`^(?=.*[A-Za-z])(?=.*\\d).*$`),
        "Please use at least one number and one letter",
      ),
    confirmPassword: z.string(),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Password must match",
      path: ["confirmPassword"],
    },
  );
