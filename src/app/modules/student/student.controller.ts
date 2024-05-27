import { Request, Response } from "express";
import { StudentServices } from "./student.service";
import { error } from "console";
import studentValidationSchema from "./student.validation";

const getAllStudent = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: "student are retrieved successfully",
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

const deleteSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteSingleStudentFromDB(studentId);
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
  getAllStudent,
  getSignleStudent,
  deleteSingleStudent,
};
