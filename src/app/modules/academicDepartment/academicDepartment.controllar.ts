import httpStatus from "http-status";
import catchAsync from "../../utilits/catchAsync";
import sentResponse from "../../utilits/sendResponse";
import { AcademicDepartmentService } from "./academicDepartment.service";

const createAcademicDepartment = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentService.createAcademicDepartmentIntoDB(
    req.body
  );
  sentResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "create Academic Department is successfully",
    data: result,
  });
});
const getAllAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentService.getAllAcademicDepartmentFromDB();
  sentResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Academic Department are retrived  successfully",
    data: result,
  });
});
const getSigleAcademicDepartment = catchAsync(async (req, res) => {
  const { DepartmentID } = req.params;
  const result =
    await AcademicDepartmentService.getSingleAcademicDepartmentFromDB(
      DepartmentID
    );
  sentResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "  Academic Department  is retirved successfully",
    data: result,
  });
});
const updateAcademicDepartment = catchAsync(async (req, res) => {
  const { DepartmentID } = req.params;
  const result = await AcademicDepartmentService.updateAcademyDepartmentIntoDB(
    DepartmentID,
    req.body
  );
  console.log(DepartmentID);
  sentResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "  Academic Department  updated  is successfully",
    data: result,
  });
});

export const AcademicDepartmentController = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSigleAcademicDepartment,
  updateAcademicDepartment,
};
