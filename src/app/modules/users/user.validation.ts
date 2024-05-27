import { z } from "zod";

export const userValidationSchema = z.object({
  password: z
    .string({ invalid_type_error: "password must be string" })
    .max(20, { message: "Password can not more then 20 characters" })
    .optional(),
});
export const userValidation = {
  userValidationSchema,
};
