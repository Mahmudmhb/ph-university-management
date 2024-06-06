import { object, string } from "zod";
import config from "../../config";
import { TStudent } from "../student/student.interfase";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { Student } from "../student/student.model";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { generateStudentId } from "./user.utlits";
import { TAcademicSemester } from "../academicSemester/academicSemester.interfase";
import mongoose from "mongoose";

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // if (await Student.isUserExists(StudentData.id)) {
  //   throw new Error("user already exists ");
  // }
  //   create a user object
  const userData: Partial<TUser> = {};
  // if if password not given

  userData.password = password || (config.default_pass as string);

  //   set user role
  userData.role = "student";

  // genarate student id
  //   set manualy id

  // const admissionSemester = await AcademicSemester.findById(
  //   payload.admissionSemester
  // );
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester
  );
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    userData.id = await generateStudentId(
      admissionSemester as TAcademicSemester
    );
    //   create a user with transaction -1

    const newUser = await User.create([userData], { session });
    //   create a student
    if (!newUser.length) {
      throw new Error("faild to create new user");
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference id

    //   create a Student with transaction -2
    const newStudent = await Student.create([payload], { session });

    if (!newStudent.length) {
      throw new Error("faild to create new student");
    }

    await session.commitTransaction();
    await session.endSession();
    return newStudent;

    // return newUser;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};
export const userService = {
  createStudentIntoDB,
};
