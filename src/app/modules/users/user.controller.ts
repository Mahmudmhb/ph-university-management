import { NextFunction, Request, RequestHandler, Response } from "express";
import { userService } from "./user.service";
import sentResponse from "../../utilits/sendResponse";
import httpStatus from "http-status";

const ceateStudent: RequestHandler = async (req, res, next) => {
  try {
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
  } catch (err) {
    // res.status(500).json({
    //   success: false,
    //   message: "validation error",
    //   data: err,
    // });
    next(err);
  }
};
export const UserController = {
  ceateStudent,
};
