import e from "express";
import QueryBuilder from "../../builder/queryBuilder";
import { courseSearhTableField } from "./course.constent";
import { TCoruseFaculty, TCourse } from "./course.interfase";
import { Course, CourseFaculty } from "./course.model";
import mongoose from "mongoose";
import AppError from "../../error/AppError";
import httpStatus from "http-status";

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};
const getAllCourseFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate("preRequisiteCourse.course"),
    query
  )
    .search(courseSearhTableField)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await courseQuery.modelQuery;
  return result;
};
const getSignleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate(
    "preRequisiteCourse.course"
  );
  return result;
};
const deletrCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return result;
};
const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourse, ...courseRemainingData } = payload;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const updateBasicCourseInfo = await Course.findByIdAndUpdate(
      id,
      courseRemainingData,
      {
        new: true,
        runValidators: true,
        session,
      }
    );
    if (!updateBasicCourseInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, "faild to updated");
    }

    // id there any preRequisiteCourse here
    if (preRequisiteCourse && preRequisiteCourse.length > 0) {
      // fillter out any delete course
      const deletedPreruisite = preRequisiteCourse
        .filter((el) => el.course && el.isDeleted)
        .map((el) => el.course);
      const deletedPreruisiteCourse = await Course.findByIdAndUpdate(
        id,
        {
          $pull: { preRequisiteCourse: { course: { $in: deletedPreruisite } } },
        },
        { new: true, runValidators: true, session }
      );
      if (!deletedPreruisiteCourse) {
        throw new AppError(httpStatus.BAD_REQUEST, "faild to updated");
      }
      // filter out new course is here
      const newPreRequisite = preRequisiteCourse?.filter(
        (el) => el.course && !el.isDeleted
      );
      const newPreRequisiteCourse = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourse: { $each: newPreRequisite } },
        },
        { new: true, runValidators: true, session }
      );
      if (!newPreRequisiteCourse) {
        throw new AppError(httpStatus.BAD_REQUEST, "faild to updated");
      }
      const result = await Course.findById(id).populate(
        "preRequisiteCourse.course"
      );
      return result;
    }
    await session.commitTransaction();
    await session.endSession();
  } catch {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, "faild to updated");
  }
};
const assignFacultiesWithCourseIntoDB = async (
  id: string,
  payload: Partial<TCoruseFaculty>
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: { faculties: { $each: payload } },
    },
    { upsert: true, new: true }
  );
  return result;
};
const removeFacultiesFromCourseFromDB = async (
  id: string,
  payload: Partial<TCoruseFaculty>
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      $pull: { faculties: { $in: payload } },
    },
    { new: true }
  );
  return result;
};
export const CourseServices = {
  createCourseIntoDB,
  getSignleCourseFromDB,
  getAllCourseFromDB,
  deletrCourseFromDB,
  updateCourseIntoDB,
  assignFacultiesWithCourseIntoDB,
  removeFacultiesFromCourseFromDB,
};
