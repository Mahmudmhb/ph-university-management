import { z } from "zod";
const crateAcademicFacultyValidationShema = z.object({
  body: z.object({
    name: z.string({
      required_error: " Academic Faculty is required",
      invalid_type_error: "Academic Faculty must be a string",
    }),
  }),
});
const updateAcademicFacultyValidationShema = z.object({
  body: z
    .object({
      name: z.string({
        required_error: " Academic Faculty is required",
        invalid_type_error: "Academic Faculty must be a string",
      }),
    })
    .optional(),
});

export const academicFacultyValidation = {
  crateAcademicFacultyValidationShema,
  updateAcademicFacultyValidationShema,
};
