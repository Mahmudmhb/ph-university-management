import { Request, Response } from "express";
import { userService } from "./user.service";

const ceateStudent = async (req: Request, res: Response) => {
  try {
    const { password, student: studentData } = req.body;
    // create a schema validation with zod
    //   const zodValidationSchema = studentValidationSchema.parse(studentData);

    // will call service func to  sent  this data
    const result = await userService.createStudentIntoDB(password, studentData);

    // sent response
    res.status(200).json({
      success: true,
      message: "student is create successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      data: err,
    });
  }
};
export const UserController = {
  ceateStudent,
};
