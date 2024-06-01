import { Schema, model } from "mongoose";
import { TAcademicfaculty } from "./academicFaculty.interfase";

const academicFacultySchema = new Schema<TAcademicfaculty>(
  {
    name: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

export const AcademicFaculty = model<TAcademicfaculty>(
  "AcademicFaculty",
  academicFacultySchema
);
