import { Schema, Types, model } from "mongoose";
import {
  TCoruseFaculty,
  TCourse,
  TPreRequisiteCourese,
} from "./course.interfase";
import { boolean } from "zod";
const preRequisiteCoureseSchema = new Schema<TPreRequisiteCourese>({
  course: { type: Schema.Types.ObjectId, ref: "Course" },
  isDeleted: { type: Boolean, default: false },
});

const courseShcema = new Schema<TCourse>({
  title: { type: String, required: true, trim: true },
  prefix: { type: String, required: true, unique: true, trim: true },
  code: { type: Number, required: true, trim: true },
  credits: { type: Number, required: true, trim: true },
  preRequisiteCourse: [preRequisiteCoureseSchema],
  isDeleted: { type: Boolean, default: false },
});

export const Course = model<TCourse>("Course", courseShcema);

const corseFacultisSchema = new Schema<TCoruseFaculty>({
  course: { type: Schema.Types.ObjectId, ref: "Course", unique: true },
  faculties: [{ type: Schema.Types.ObjectId, ref: "Faculty" }],
});

export const CourseFaculty = model<TCoruseFaculty>(
  "CourseFaculty",
  corseFacultisSchema
);
