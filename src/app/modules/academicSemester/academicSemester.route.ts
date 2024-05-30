import { Router } from "express";
import { AcademicSemesterController } from "./academicSemester.Controller";
import validationRequset from "../../middlewares/validedRequset";
import { AcademicSemesterValidations } from "./academicSemester.validation";

const router = Router();
router.post(
  "/create-academic-semester",
  validationRequset(
    AcademicSemesterValidations.createAcademicSemesterValidationSchema
  ),
  AcademicSemesterController.createAcademicSemester
);

router.get("/", AcademicSemesterController.getAllAndSignleAcademicSemester);
router.get(
  "/:semesterId",
  AcademicSemesterController.getAllAndSignleAcademicSemester
);
router.patch(
  "/:semesterId",
  validationRequset(
    AcademicSemesterValidations.updateAcademicSemesterValidationSchema
  ),
  AcademicSemesterController.updateAcademicSemester
);
export const AcademicSemesterRoutes = router;
