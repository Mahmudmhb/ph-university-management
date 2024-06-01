import { Router } from "express";
import validationRequset from "../../middlewares/validedRequset";
import { academicDepartmentValidonSchema } from "./academicDepartment.validation";
import { AcademicDepartmentController } from "./academicDepartment.controllar";

const router = Router();

router.post(
  "/create-academic-department",
  validationRequset(
    academicDepartmentValidonSchema.createAcademicDepartmentValidationSchema
  ),
  AcademicDepartmentController.createAcademicDepartment
);
router.get("/", AcademicDepartmentController.getAllAcademicDepartment);
router.get(
  "/:DepartmentID",
  AcademicDepartmentController.getSigleAcademicDepartment
);
router.patch(
  "/:DepartmentID",
  validationRequset(
    academicDepartmentValidonSchema.updateAcademicDepartmentValidationSchema
  ),
  AcademicDepartmentController.updateAcademicDepartment
);
export const AcademicDepartmentRoute = router;
