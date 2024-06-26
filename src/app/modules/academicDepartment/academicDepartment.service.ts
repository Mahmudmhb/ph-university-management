import { TAcademicDepartment } from "./academicDepartment.interfase";
import { AcademicDepartment } from "./academicDepartment.model";

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);
  return result;
};

const getAllAcademicDepartmentFromDB = async () => {
  const result = await AcademicDepartment.find().populate("academicFaculty");
  return result;
};

const getSingleAcademicDepartmentFromDB = async (id: string) => {
  const result = await AcademicDepartment.findById(id).populate(
    "academicFaculty"
  );
  return result;
};

const updateAcademyDepartmentIntoDB = async (
  id: string,
  payload: Partial<TAcademicDepartment>
) => {
  const result = await AcademicDepartment.findByIdAndUpdate(id, payload, {
    new: true,
  }).populate("academicFaculty");
  return result;
};
export const AcademicDepartmentService = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentFromDB,
  getSingleAcademicDepartmentFromDB,
  updateAcademyDepartmentIntoDB,
};
