import { Mongoose } from "mongoose";
import { TErrorSources } from "../interface/error";

const handleDuplicateError = (err: any) => {
  const match = err.message.match(/"([^"]*)"/);
  const extractMessage = match && match[1];
  const errorSource: TErrorSources = [
    {
      path: "",
      message: `${extractMessage} already exsits`,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: "Invalid  ID",
    errorSource,
  };
};
export default handleDuplicateError;
