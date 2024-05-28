import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const validationRequset = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // validation check
    try {
      await schema.parseAsync({
        body: req.body,
      });
      return next();
    } catch (err) {
      next(err);
    }
  };
};
export default validationRequset;
