import { academicSemesterNameCodeMapper } from "./academicSemester.constent";
import { TAcademicSemester } from "./academicSemester.interfase";
import { AcademicSemester } from "./academicSemester.model";

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error(`${payload.name} and ${payload.code} is not exsits `);
  }
  const result = await AcademicSemester.create(payload);
  return result;
};
const getAllAcademicSemesterFromDB = async () => {
  const result = AcademicSemester.find();
  return result;
};
const getSingleAcademicSemeterFromDB = async (academicSemesterId: string) => {
  const result = await AcademicSemester.findOne({ _id: academicSemesterId });
  return result;
};

const updateAcademicSemesterIntoDB = async (
  id: string,
  payload: Partial<TAcademicSemester>
) => {
  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  console.log("service section", result);
  return result;
};
export const AcademicSemesterService = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesterFromDB,
  getSingleAcademicSemeterFromDB,
  updateAcademicSemesterIntoDB,
};
