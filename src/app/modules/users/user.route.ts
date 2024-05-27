import express from "express";
import { UserController } from "./user.controller";
const router = express.Router();

router.post("/create-student", UserController.ceateStudent);
export const userRouter = router;
