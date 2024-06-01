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
academicFacultySchema.pre("save", async function (next) {
  const isDepartmentExsits = await AcademicFaculty.findOne({
    name: this.name,
  });
  if (isDepartmentExsits) {
    throw new Error(" department Already exsits");
  }
  next();
});
academicFacultySchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery();
  console.log(query);
  const isFacultyExsits = await AcademicFaculty.findOne({ query });
  console.log(isFacultyExsits);
  if (!isFacultyExsits) {
    throw new Error(" Faculty dose not exsits");
  }
  next();
});
export const AcademicFaculty = model<TAcademicfaculty>(
  "AcademicFaculty",
  academicFacultySchema
);
