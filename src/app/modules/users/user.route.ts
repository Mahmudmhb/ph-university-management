import express, { NextFunction, Request, Response } from "express";
import { UserController } from "./user.controller";
import { AnyZodObject } from "zod";
import { studentValidations } from "../student/student.validation";
import validationRequset from "../../middlewares/validedRequset";
const router = express.Router();

router.post(
  "/create-student",
  validationRequset(studentValidations.createStudentValidationSchema),
  UserController.ceateStudent
);
export const userRouter = router;
