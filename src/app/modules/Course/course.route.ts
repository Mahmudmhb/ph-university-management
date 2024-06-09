import { Router } from "express";
import validationRequset from "../../middlewares/validedRequset";
import { CourseValidation } from "./course.validation";
import { CourseController } from "./course.Controller";

const router = Router();
router.post(
  "/create-course",
  validationRequset(CourseValidation.createCourseValidationSchema),
  CourseController.createCourse
);
router.get("/:id", CourseController.getSingleCourse);
router.delete("/:id", CourseController.deleteCourse);
router.get("/", CourseController.getAllCoursese);
router.put(
  "/:courseId/assign-faculties",
  validationRequset(CourseValidation.CoureseWithFacultisValidationSchema),
  CourseController.assignFaculties
);
router.delete(
  "/:courseId/remove-faculties",
  validationRequset(CourseValidation.CoureseWithFacultisValidationSchema),
  CourseController.removeFacultiesFromCourse
);
router.patch(
  "/:id",
  validationRequset(CourseValidation.updateCourseValidationSchema),
  CourseController.updateCourse
);
export const courseRouter = router;
