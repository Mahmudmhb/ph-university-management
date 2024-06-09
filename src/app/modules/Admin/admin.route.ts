import { Router } from "express";
import { AdminControllers } from "./admin.controller";
import validationRequset from "../../middlewares/validedRequset";
import { updateAdminValidationSchema } from "./admin.validation";

const router = Router();

router.get("/", AdminControllers.getAllAdmins);

router.get("/:id", AdminControllers.getSingleAdmin);

router.patch(
  "/:id",
  validationRequset(updateAdminValidationSchema),
  AdminControllers.updateAdmin
);

router.delete("/:adminId", AdminControllers.deleteAdmin);

export const AdminRoutes = router;
