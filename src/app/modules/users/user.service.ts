import { object, string } from "zod";
import config from "../../config";
import { TStudent } from "../student/student.interfase";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { Student } from "../student/student.model";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { generateStudentId } from "./user.utlits";

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
  userData.id = await generateStudentId(admissionSemester);
  //   create a user

  const newUser = await User.create(userData);
  //   create a student
  if (Object.keys(newUser).length) {
    payload.id = newUser.id;
    payload.user = newUser._id; //reference id
    const newStudent = await Student.create(payload);
    return newStudent;
  }

  return newUser;
};
export const userService = {
  createStudentIntoDB,
};
