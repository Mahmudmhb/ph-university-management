import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";

const userSchema = new Schema<TUser>(
  {
    id: { type: String, required: true },
    password: { type: String },
    needsPasswordChange: { type: Boolean, default: true },
    role: {
      type: String,
      required: true,
      enum: {
        values: ["admin", "faculty", "student"],
      },
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["in-progress", "blocked"],
      },
      default: "in-progress",
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);
export const User = model<TUser>("User", userSchema);
