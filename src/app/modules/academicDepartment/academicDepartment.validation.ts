import { z } from "zod";
const createAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "Academic Department must be string",
      required_error: "Academic Department name is required",
    }),
    academicFaculty: z.string({
      invalid_type_error: "Academic Faculty must be string ",
      required_error: "Academic Faculty name is required",
    }),
  }),
});
const updateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: "Academic Department must be string ",
        required_error: "Academic Department name is required",
      })
      .optional(),
    academicFaculty: z
      .string({
        invalid_type_error: "Academic Faculty must be string ",
        required_error: "Academic Faculty name is required",
      })
      .optional(),
  }),
});
export const academicDepartmentValidonSchema = {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
};
