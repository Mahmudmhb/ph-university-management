import { Router } from "express";
import validationRequset from "../../middlewares/validedRequset";
import { academicFacultyValidation } from "./academicFaculty.validation";
import { AcademicFacultyController } from "./academicFaculty.controller";

const router = Router();
router.post(
  "/create-academic-fucalty",
  validationRequset(
    academicFacultyValidation.crateAcademicFacultyValidationShema
  ),
  AcademicFacultyController.createAcademicFaculty
);
router.get("/", AcademicFacultyController.getAllAcademicFacultise);
router.get(
  "/:facultyId",
  AcademicFacultyController.getSingleAllAcademicFacultise
);
router.patch("/facultyId", AcademicFacultyController.updateAcademyFaculty);
export const AcademicFacultyRouter = router;
