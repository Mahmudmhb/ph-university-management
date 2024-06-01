import { TAcademicfaculty } from "./academicFaculty.interfase";
import { AcademicFaculty } from "./academicFaculty.model";

const createAcademicFacultyIntoDB = async (payload: TAcademicfaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

const getAllAcademicFacultiseFromDB = async () => {
  const result = await AcademicFaculty.find();
  return result;
};
const getSingleAcademicFacultyFromDB = async (id: string) => {
  const result = await AcademicFaculty.findById(id);
  return result;
};

const updateAcademyFacultyIntoDB = async (
  id: string,
  payload: Partial<TAcademicfaculty>
) => {
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
export const academicFacultyService = {
  getAllAcademicFacultiseFromDB,
  updateAcademyFacultyIntoDB,
  getSingleAcademicFacultyFromDB,
  createAcademicFacultyIntoDB,
};
