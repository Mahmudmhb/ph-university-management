import { Schema, model } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interfase";

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: { type: String, required: true, unique: true },
    academicFaculty: { type: Schema.Types.ObjectId, ref: "AcademicFaculty" },
  },
  {
    timestamps: true,
  }
);

// academicDepartmentSchema.pre("save", async function (next) {
//   const isDepartmentExsits = await AcademicDepartment.findOne({
//     name: this.name,
//   });
//   if (isDepartmentExsits) {
//     throw new Error(" department Already exsits");
//   }
//   next();
// });
academicDepartmentSchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery();
  console.log(query);
  const isDepartmentExsits = await AcademicDepartment.findOne({ query });
  if (!isDepartmentExsits) {
    throw new Error(" department dose  not exsits");
  }
  next();
});
export const AcademicDepartment = model<TAcademicDepartment>(
  "AcademicDepartment",
  academicDepartmentSchema
);
