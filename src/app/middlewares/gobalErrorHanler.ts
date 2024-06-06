import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { TErrorSources } from "../interface/error";
import config from "../config";
import handleZodError from "../error/handleZodError";
import handleValidationError from "../error/handleValidationError";
import handleCastError from "../error/handleCastError";
import handleDuplicateError from "../error/handleDuplicateError";
import AppError from "../error/AppError";

const gobalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = err.message || "something was wrong";

  let errorSource: TErrorSources = [
    {
      path: "",
      message: "something was wrong",
    },
  ];

  if (err instanceof ZodError) {
    const simplefeidError = handleZodError(err);
    message = simplefeidError?.message;
    statusCode = simplefeidError?.statusCode;
    errorSource = simplefeidError?.errorSource;
  } else if (err?.name === "ValidationError") {
    const simplefeidError = handleValidationError(err);
    statusCode = simplefeidError.statusCode;
    message = simplefeidError?.message;
    errorSource = simplefeidError.errorSource;
  } else if (err.name === "CastError") {
    const simplefeidError = handleCastError(err);
    statusCode = simplefeidError.statusCode;
    message = simplefeidError?.message;
    errorSource = simplefeidError.errorSource;
  } else if (err.code === 11000) {
    const simplefeidError = handleDuplicateError(err);
    statusCode = simplefeidError.statusCode;
    message = simplefeidError?.message;
    errorSource = simplefeidError.errorSource;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorSource = [{ path: "", message: err?.message }];
  } else if (err instanceof Error) {
    message = err?.message;
    errorSource = [{ path: "", message: err?.message }];
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSource,
    err,

    stack: config.NODE_ENV === "development" ? err.stack : null,
  });
  // next();
};
export default gobalErrorHandler;
