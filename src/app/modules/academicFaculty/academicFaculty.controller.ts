import httpStatus from "http-status";
import catchAsync from "../../utilits/catchAsync";
import sentResponse from "../../utilits/sendResponse";
import { academicFacultyService } from "./academicFaculty.service";

const createAcademicFaculty = catchAsync(async (req, res) => {
  const result = await academicFacultyService.createAcademicFacultyIntoDB(
    req.body
  );
  sentResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Faculty is create is successfully",
    data: result,
  });
});
const getAllAcademicFacultise = catchAsync(async (req, res) => {
  const result = await academicFacultyService.getAllAcademicFacultiseFromDB();
  sentResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Academic Faculty are retrieved successfully",
    data: result,
  });
});
const getSingleAllAcademicFacultise = catchAsync(async (req, res) => {
  const { FacultyId } = req.params;
  const result =
    academicFacultyService.getSingleAllAcademicFacultiseFromDB(FacultyId);
  sentResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Academic Faculty is retrieved successfully",
    data: result,
  });
});

const updateAcademyFaculty = catchAsync(async (req, res) => {
  const { FacultyId } = req.params;
  const result = await academicFacultyService.updateAcademyFacultyIntoDB(
    FacultyId,
    req.body
  );
  sentResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "updated Academic faculty is successfully",
    data: result,
  });
});
export const AcademicFacultyController = {
  updateAcademyFaculty,
  createAcademicFaculty,
  getAllAcademicFacultise,
  getSingleAllAcademicFacultise,
};
