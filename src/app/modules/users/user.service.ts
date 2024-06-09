import { object, string } from "zod";
import config from "../../config";
import { TStudent } from "../student/student.interfase";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { Student } from "../student/student.model";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from "./user.utlits";
import { TAcademicSemester } from "../academicSemester/academicSemester.interfase";
import mongoose from "mongoose";
import { TFaculty } from "../faculty/faculty.interfase";
import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { Faculty } from "../faculty/faculty.model";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { Admin } from "../Admin/admin.model";

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
const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_pass as string);

  //set student role
  userData.role = "faculty";

  // find academic department info
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment
  );

  if (!academicDepartment) {
    throw new AppError(400, "Academic department not found");
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateFacultyId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array

    //create a faculty
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a faculty (transaction-2)

    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create faculty");
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createAdminIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_pass as string);

  //set student role
  userData.role = "admin";

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateAdminId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session });

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin");
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin");
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};
export const userService = {
  createStudentIntoDB,
  createAdminIntoDB,
  createFacultyIntoDB,
};
