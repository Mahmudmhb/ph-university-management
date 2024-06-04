import express from "express";
import { studentController } from "./student.controller";
import validationRequset from "../../middlewares/validedRequset";
import { studentValidations } from "./student.validation";

const router = express.Router();
// router.post("/create-student", studentController.ceateStudent);
router.get("/", studentController.getAllStudent);
router.patch(
  "/:studentId",

  studentController.updateSingleStudent
);
router.delete("/:studentId", studentController.deleteSingleStudent);
router.get("/:studentId", studentController.getSignleStudent);
export const studentRoute = router;
