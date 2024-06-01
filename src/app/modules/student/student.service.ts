import { TStudent } from "./student.interfase";
import { Student } from "./student.model";

const getAllStudentsFromDB = async () => {
  const result = await Student.find()
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  return result;
};
const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ _id: id });
  const result = await Student.findById(id)
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  return result;
};
const deleteSingleStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ _id: id }, { isDeleted: true });
  return result;
};
export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteSingleStudentFromDB,
};
