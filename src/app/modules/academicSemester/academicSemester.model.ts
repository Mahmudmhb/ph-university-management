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
  year: { type: String, required: true },
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

academicSemesterSchema.pre("save", async function (next) {
  const isSemesterExsits = await AcademicSemester.findOne({
    year: this.year,
    name: this.name,
  });
  if (isSemesterExsits) {
    throw new Error(`${this.name} alleady exsits in this year ${this.year}`);
  }
  next();
});

export const AcademicSemester = model<TAcademicSemester>(
  "AcademicSemester",
  academicSemesterSchema
);
