import express, { Application, NextFunction, Request, Response } from "express";
const app: Application = express();
import cors from "cors";
import { studentRoute } from "./app/modules/student/student.route";
import { userRouter } from "./app/modules/users/user.route";
import gobalErrorHandler from "./app/middlewares/gobalErrorHanler";
import NotFound from "./app/middlewares/notFound";
import router from "./app/route";

app.use(express.json());
app.use(cors());
app.use("/api/v1/", router);
app.use(NotFound);

app.use(gobalErrorHandler);
export default app;
