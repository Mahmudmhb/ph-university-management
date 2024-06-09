import { NextFunction, Request, RequestHandler, Response } from "express";
import { userService } from "./user.service";
import sentResponse from "../../utilits/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utilits/catchAsync";

const ceateStudent: RequestHandler = catchAsync(async (req, res, next) => {
  const { password, student: studentData } = req.body;
  // create a schema validation with zod
  //   const zodValidationSchema = studentValidationSchema.parse(studentData);

  // will call service func to  sent  this data
  const result = await userService.createStudentIntoDB(password, studentData);

  // sent response
  // res.status(200).json({
  //   success: true,
  //   message: "student is create successfully",
  //   data: result,
  // });
  sentResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "student is create successfully",
    data: result,
  });
});
const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;

  const result = await userService.createFacultyIntoDB(password, facultyData);

  sentResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty is created succesfully",
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await userService.createAdminIntoDB(password, adminData);

  sentResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin is created succesfully",
    data: result,
  });
});
export const UserController = {
  ceateStudent,
  createFaculty,
  createAdmin,
};
