import { TAcademicSemester } from "../academicSemester/academicSemester.interfase";
import { User } from "./user.model";

const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: "student",
    },
    { id: 1, _id: 0 }
  )
    .sort({ createAt: -1 })
    .lean();
  return lastStudent?.id ? lastStudent.id.substring(6) : undefined;
};

// genarate student id
export const generateStudentId = async (payload: TAcademicSemester) => {
  const currentId = (await findLastStudentId()) || (0).toString();
  let incrimentId = (Number(currentId) + 1).toString().padStart(4, "0");
  incrimentId = `${payload.year}${payload.code}${incrimentId}`;
  return incrimentId;
};