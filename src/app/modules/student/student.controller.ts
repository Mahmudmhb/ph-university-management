import { NextFunction, Request, RequestHandler, Response } from "express";
import { StudentServices } from "./student.service";
import { error } from "console";
import sentResponse from "../../utilits/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utilits/catchAsync";

const getAllStudent: RequestHandler = catchAsync(async (req, res, next) => {
  // try {
  const result = await StudentServices.getAllStudentsFromDB();
  res.status(200).json({
    success: true,
    message: "student are retrieved successfully",
    data: result,
  });
  // } catch (err) {
  //   // res.status(500).json({
  //   //   success: false,
  //   //   message: "validation error",
  //   //   data: err,
  //   // });
  //   next(err);
  // }
});

const getSignleStudent: RequestHandler = catchAsync(async (req, res, next) => {
  // try {
  const { studentId } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(studentId);
  sentResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "student get successfully",
    data: result,
  });
  // } catch (err) {
  // res.status(500).json({
  //   success: false,
  //   message: "validation error",
  //   data: err,
  // });
  //   next(err);
  // }
});

const deleteSingleStudent: RequestHandler = catchAsync(
  async (req, res, next) => {
    const { studentId } = req.params;
    const result = await StudentServices.deleteSingleStudentFromDB(studentId);
    sentResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "student is delete successfully",
      data: result,
    });
  }
);
export const studentController = {
  getAllStudent,
  getSignleStudent,
  deleteSingleStudent,
};
