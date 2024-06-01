import { Router } from "express";
import validationRequset from "../../middlewares/validedRequset";
import { academicFacultyValidation } from "./academicFaculty.validation";
import { AcademicFacultyController } from "./academicFaculty.controller";

const router = Router();
router.post(
  "/create-academic-fucaltise",
  validationRequset(
    academicFacultyValidation.crateAcademicFacultyValidationShema
  ),
  AcademicFacultyController.createAcademicFaculty
);
router.get("/", AcademicFacultyController.getAllAcademicFacultise);
router.get("/:facultyId", AcademicFacultyController.getSingleAcademicFaculty);
router.patch(
  "/:facultyId",
  validationRequset(
    academicFacultyValidation.updateAcademicFacultyValidationShema
  ),
  AcademicFacultyController.updateAcademyFaculty
);
export const AcademicFacultyRouter = router;
