import { z } from "zod";
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from "./academicSemester.constent";

const createAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...AcademicSemesterName] as [string]),
    code: z.enum([...AcademicSemesterCode] as [string]),
    year: z.string(),
    startMonth: z.enum([...Months] as [string]),
    endMonth: z.enum([...Months] as [string]),
  }),
});
const updateAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...AcademicSemesterName] as [string]).optional(),
    code: z.enum([...AcademicSemesterCode] as [string]).optional(),
    year: z.string(),
    startMonth: z.enum([...Months] as [string]).optional(),
    endMonth: z.enum([...Months] as [string]).optional(),
  }),
});
export const AcademicSemesterValidations = {
  createAcademicSemesterValidationSchema,
  updateAcademicSemesterValidationSchema,
};
