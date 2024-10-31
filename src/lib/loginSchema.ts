import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Please enter valid email address "),
  password: z.string(),
});
