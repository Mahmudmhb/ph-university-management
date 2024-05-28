import httpStatus from "http-status";
import catchAsync from "../../utilits/catchAsync";
import sentResponse from "../../utilits/sendResponse";
import { AcademicSemesterService } from "./academicSemester.service";

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterService.createAcademicSemesterIntoDB(
    req.body
  );

  sentResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Semester create succesfully",
    data: result,
  });
});

const updateAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result = await AcademicSemesterService.updateAcademicSemesterIntoDB(
    semesterId,
    req.body
  );
  sentResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Academic Semester",
    data: result,
  });
});
const getAllAndSignleAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  if (semesterId) {
    const result = await AcademicSemesterService.getSingleAcademicSemeterFromDB(
      semesterId
    );
    sentResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "All Academic Semester",
      data: result,
    });
  } else {
    const result = await AcademicSemesterService.getAllAcademicSemesterFromDB();
    sentResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "All Academic Semester",
      data: result,
    });
  }
});
export const AcademicSemesterController = {
  createAcademicSemester,
  getAllAndSignleAcademicSemester,
  updateAcademicSemester,
};
