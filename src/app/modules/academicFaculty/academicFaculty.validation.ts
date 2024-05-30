import { z } from "zod";
const crateAcademicFacultyValidationShema = z.object({
  name: z.string({
    required_error: " AcademicFaculty is required",
    invalid_type_error: "AcademicFaculty must be a string",
  }),
});
const updateAcademicFacultyValidationShema = z.object({
  name: z
    .string({
      required_error: "AcademicFaculty is required",
      invalid_type_error: "AcademicFaculty must be a string",
    })
    .optional(),
});

export const academicFacultyValidation = {
  crateAcademicFacultyValidationShema,
  updateAcademicFacultyValidationShema,
};
