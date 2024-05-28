import { Schema, model } from "mongoose";
import {
  TAcademicSemester,
  TMonths,
  TAcademicSemesterName,
  TAcademicSemesterCode,
} from "./academicSemester.interfase";
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from "./academicSemester.constent";

const academicSemesterSchema = new Schema<TAcademicSemester>({
  name: { type: String, enum: AcademicSemesterName, required: true },
  code: { type: String, enum: AcademicSemesterCode, required: true },
  year: { type: Date, required: true },
  startMonth: {
    type: String,
    enum: Months,
    required: true,
  },
  endMonth: {
    type: String,
    enum: Months,
    required: true,
  },
});

export const AcademicSemester = model<TAcademicSemester>(
  "AcademicSemester",
  academicSemesterSchema
);
