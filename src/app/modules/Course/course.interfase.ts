import { Types } from "mongoose";

export type TPreRequisiteCourese = {
  course: Types.ObjectId;
  isDeleted: boolean;
};
export type TCourse = {
  title: string;
  prefix: string;
  code: number;
  credits: number;
  preRequisiteCourse: [TPreRequisiteCourese];
  isDeleted: { type: Boolean; default: false };
};

export type TCoruseFaculty = {
  course: Types.ObjectId;
  faculties: [Types.ObjectId];
};
