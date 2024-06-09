import { string, z } from "zod";

const preRequisiteCoureseValidationSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});

const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    prefix: z.string(),
    code: z.number(),
    credits: z.number(),
    preRequisiteCourse: z.array(preRequisiteCoureseValidationSchema).optional(),
    isDeleted: z.boolean().optional(),
  }),
});
const updatePreRequisiteCoureseValidationSchema = z.object({
  course: z.string().optional(),
  isDeleted: z.boolean().optional(),
});
const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    prefix: z.string().optional(),
    code: z.number().optional(),
    credits: z.number().optional(),
    preRequisiteCourse: z
      .array(updatePreRequisiteCoureseValidationSchema)
      .optional(),
    isDeleted: z.boolean().optional(),
  }),
});
const CoureseWithFacultisValidationSchema = z.object({
  body: z.object({
    faculties: z.array(z.string()),
  }),
});
export const CourseValidation = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
  CoureseWithFacultisValidationSchema,
};
