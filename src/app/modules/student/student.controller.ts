import { Request, Response } from "express";
import { StudentServices } from "./student.service";
import { error } from "console";

const ceateStudent = async (req: Request, res: Response) => {
  try {
    // create a schema validation with joi

    const { student: studentData } = req.body;
    // will call service func to  sent  this data
    const result = await StudentServices.createStudentIntoDB(studentData);

    // sent response
    res.status(200).json({
      success: true,
      message: "student is create successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "validation error",
      data: err,
    });
  }
};

const getAllStudent = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: "student are retrieved successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "validation error",
      data: err,
    });
  }
};

const getSignleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: "get single stundent",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "validation error",
      data: err,
    });
  }
};
export const studentController = {
  ceateStudent,
  getAllStudent,
  getSignleStudent,
};
