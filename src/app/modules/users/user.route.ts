import express, { NextFunction, Request, Response } from "express";
import { UserController } from "./user.controller";
import { studentValidations } from "../student/student.validation";
import validationRequset from "../../middlewares/validedRequset";
import { createFacultyValidationSchema } from "../faculty/faculty.validation";
import { createAdminValidationSchema } from "../Admin/admin.validation";
const router = express.Router();

router.post(
  "/create-student",
  validationRequset(studentValidations.createStudentValidationSchema),
  UserController.ceateStudent
);
router.post(
  "/create-faculty",
  validationRequset(createFacultyValidationSchema),
  UserController.createFaculty
);

router.post(
  "/create-admin",
  validationRequset(createAdminValidationSchema),
  UserController.createAdmin
);
export const userRouter = router;
