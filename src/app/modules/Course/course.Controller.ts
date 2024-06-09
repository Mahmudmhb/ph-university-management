import httpStatus from "http-status";
import catchAsync from "../../utilits/catchAsync";
import sentResponse from "../../utilits/sendResponse";
import { CourseServices } from "./course.service";

const createCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.createCourseIntoDB(req.body);

  sentResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course is create is successfully",
    data: result,
  });
});
const getAllCoursese = catchAsync(async (req, res) => {
  const result = await CourseServices.getAllCourseFromDB(req.query);
  sentResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Course are retrieved successfully",
    data: result,
  });
});
const getSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.getSignleCourseFromDB(id);
  sentResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course is retrieved successfully",
    data: result,
  });
});
const deleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.deletrCourseFromDB(id);
  sentResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course is retrieved successfully",
    data: result,
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.updateCourseIntoDB(id, req.body);
  sentResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "updated Academic faculty is successfully",
    data: result,
  });
});

const assignFaculties = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;
  const result = await CourseServices.assignFacultiesWithCourseIntoDB(
    courseId,
    faculties
  );
  sentResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty assign successfully",
    data: result,
  });
});
const removeFacultiesFromCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;
  const result = await CourseServices.removeFacultiesFromCourseFromDB(
    courseId,
    faculties
  );
  sentResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty removed successfully",
    data: result,
  });
});

export const CourseController = {
  createCourse,
  getAllCoursese,
  getSingleCourse,
  updateCourse,
  deleteCourse,
  assignFaculties,
  removeFacultiesFromCourse,
};
