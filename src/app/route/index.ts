import { Router } from "express";
import { userRouter } from "../modules/users/user.route";
import { studentRoute } from "../modules/student/student.route";
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.route";
import { AcademicFacultyRouter } from "../modules/academicFaculty/academicFaculty.route";

const router = Router();

const modulesRoute = [
  {
    path: "/users",
    route: userRouter,
  },
  {
    path: "/student",
    route: studentRoute,
  },
  {
    path: "/academic-semesters",
    route: AcademicSemesterRoutes,
  },
  {
    path: "/academic-faculty",
    route: AcademicFacultyRouter,
  },
];
modulesRoute.forEach((route) => router.use(route.path, route.route));
export default router;
