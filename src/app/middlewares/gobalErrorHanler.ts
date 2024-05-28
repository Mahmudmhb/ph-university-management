import { NextFunction, Request, Response } from "express";

const gobalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = 500;
  const message = err.message || "something was wrong";
  return res.status(statusCode).json({
    success: false,
    message: message,
  });
  // next();
};
export default gobalErrorHandler;
