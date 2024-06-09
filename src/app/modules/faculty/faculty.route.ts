import { Router } from "express";
import { FacultyControllers } from "./faculty.controller";
import validationRequset from "../../middlewares/validedRequset";
import { updateFacultyValidationSchema } from "./faculty.validation";

const router = Router();

router.get("/:id", FacultyControllers.getSingleFaculty);

router.patch(
  "/:id",
  validationRequset(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty
);

router.delete("/:id", FacultyControllers.deleteFaculty);

router.get("/", FacultyControllers.getAllFaculties);

export const FacultyRoutes = router;
