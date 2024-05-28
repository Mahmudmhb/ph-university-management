import { Router } from "express";
import { AcademicSemesterController } from "./academicSemester.Controller";

const router = Router();
router.post(
  "/create-academic-semester",
  AcademicSemesterController.createAcademicSemester
);
const AcademicSemesterRoutes = router;
