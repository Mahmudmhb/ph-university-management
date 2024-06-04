import { Error } from "mongoose";
import { TErrorSources, TGeneticErrorResponse } from "../interface/error";

const handleCastError = (err: Error.CastError): TGeneticErrorResponse => {
  const errorSource: TErrorSources = [
    {
      path: err?.path,
      message: err?.message,
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: "Invalid  ID",
    errorSource,
  };
};
export default handleCastError;
