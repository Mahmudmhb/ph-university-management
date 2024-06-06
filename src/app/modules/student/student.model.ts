import { Schema, Types, model } from "mongoose";
import {
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TuserName,
} from "./student.interfase";
import bcrypt from "bcrypt";
import config from "../../config";
import { boolean, number } from "zod";

const userNameSchema = new Schema<TuserName>({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
    maxlength: [20, "First name cant more then 20 cherecters"],
  },
  middleName: { type: String },
  lastName: { type: String, required: [true, "Last name is required"] },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: [true, "Father's name is required"] },
  fatherOccupation: {
    type: String,
    required: [true, "Father's occupation is required"],
  },
  fatherContactNo: {
    type: String,
    required: [true, "Father's contact number is required"],
  },
  motherName: { type: String, required: [true, "Mother's name is required"] },
  motherOccupation: {
    type: String,
    required: [true, "Mother's occupation is required"],
  },
  motherContactNo: { type: String },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: [true, "Local guardian's name is required"] },
  occupation: {
    type: String,
    required: [true, "Local guardian's occupation is required"],
  },
  contactNo: {
    type: String,
    required: [true, "Local guardian's contact number is required"],
  },
  address: {
    type: String,
    required: [true, "Local guardian's address is required"],
  },
});

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: {
      type: String,
      required: [true, "Student ID is required"],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "User ID is required"],
      unique: true,
      ref: "User",
    },
    // password: {
    //   type: String,
    //   required: [true, "Password is required"],
    //   unique: true,
    // },
    name: {
      type: userNameSchema,
      required: [true, "Student name is required"],
      _id: false,
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "others"],
        message: "'{VALUE}' is not a valid gender",
      },
      required: [true, "Gender is required"],
    },
    dateOfBirth: { type: Date },
    email: { type: String, unique: true },
    contactNo: { type: String, required: [true, "Contact number is required"] },
    emergencyContactNo: {
      type: String,
      required: [true, "Emergency contact number is required"],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: [
          "A",
          "B",
          "AB",
          "O",
          "A+",
          "B+",
          "AB+",
          "O+",
          "A-",
          "B-",
          "AB-",
          "O-",
        ],
        message: "'{VALUE}' is not a valid blood group",
      },
      required: [true, "Blood group is required"],
    },
    presentAddress: {
      type: String,
      required: [true, "Present address is required"],
    },
    permanentAddress: { type: String },
    guardian: {
      type: guardianSchema,
      required: [true, "Guardian information is required"],
      _id: false,
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, "Local guardian information is required"],
      autoIndexId: false,
    },
    profileImg: { type: String },
    // iaActive: {

    //   type: String,
    //   enum: ["active", "blocked"],
    //   default: "active",
    //   _id: false,
    // },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: "AcademicSemester",
    },
    isDeleted: { type: Boolean, default: false },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: "AcademicDepartment",
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);
// virtual added
studentSchema.virtual("fullName").get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});
// Pre middleware functions

studentSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// studentSchema.pre("findOneAndUpdate", async function (next) {
//   const query = this.getQuery();
//   // console.log("cleck the delete button", query);
//   const isStudentExsits = await Student.findOne({ query });
//   if (!isStudentExsits) {
//     throw new Error("student is  not exsits in the list");
//   }
//   next();
// });
studentSchema.pre("aggregate", function () {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
});

studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};
// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// };
export const Student = model<TStudent, StudentModel>("Student", studentSchema);
