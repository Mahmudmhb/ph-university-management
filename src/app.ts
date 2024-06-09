import express, { Application, NextFunction, Request, Response } from "express";
const app: Application = express();
import cors from "cors";
import gobalErrorHandler from "./app/middlewares/gobalErrorHanler";
import NotFound from "./app/middlewares/notFound";
import router from "./app/route";

app.use(express.json());
app.use(cors());
app.use("/api/v1/", router);

const test = async (req: Request, res: Response) => {
  Promise.reject();
  const a = 10;
  res.send(a);
};
app.get("/", test);
app.use(gobalErrorHandler);
app.use(NotFound);
export default app;
