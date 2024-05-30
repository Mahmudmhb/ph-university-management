import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import config from "../../config";
import bcrypt from "bcrypt";

const userSchema = new Schema<TUser>(
  {
    id: { type: String, required: true, unique: true },
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

userSchema.pre("save", async function (next) {
  console.log(this, "post hook data");
  // do stuff
  const user = this;
  // hass password
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round)
    // Store hash in your password DB.
  );
  next();
});
userSchema.post("save", function (doc, next) {
  console.log(this, "post  has been initialized from the db");
  doc.password = "";
  next();
});

export const User = model<TUser>("User", userSchema);
