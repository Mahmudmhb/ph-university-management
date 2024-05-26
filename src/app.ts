import express, { Application, Request, Response } from "express";
const app: Application = express();
import cors from "cors";
import { studentRoute } from "./app/modules/student/student.route";
const port = 3000;

app.use(express.json());
app.use(cors());
app.use("/api/v1/students", studentRoute);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});
export default app;
