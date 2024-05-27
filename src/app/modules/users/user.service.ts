import { object } from "zod";
import config from "../../config";
import { TStudent } from "../student/student.interfase";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { Student } from "../student/student.model";

const createStudentIntoDB = async (password: string, StudentData: TStudent) => {
  // if (await Student.isUserExists(StudentData.id)) {
  //   throw new Error("user already exists ");
  // }

  //   create a user object
  const userData: Partial<TUser> = {};
  // if if password not given

  userData.password = password || (config.default_pass as string);

  //   set user role
  userData.role = "student";

  //   set manualy id
  userData.id = "2024000001";
  //   create a user
  const newUser = await User.create(userData);

  //   create a student
  if (Object.keys(newUser).length) {
    StudentData.id = newUser.id;
    StudentData.user = newUser._id; //reference id
    const newStudent = await Student.create(StudentData);
    return newStudent;
  }

  return newUser;
};
export const userService = {
  createStudentIntoDB,
};
