import { Router } from "express";
import { userRouter } from "../modules/users/user.route";
import { studentRoute } from "../modules/student/student.route";
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.route";
import { AcademicFacultyRouter } from "../modules/academicFaculty/academicFaculty.route";
import { AcademicDepartmentRoute } from "../modules/academicDepartment/academicDepartment.route";
import { FacultyRoutes } from "../modules/faculty/faculty.route";
import { AdminRoutes } from "../modules/Admin/admin.route";
import { courseRouter } from "../modules/Course/course.route";

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
    path: "/faculties",
    route: FacultyRoutes,
  },
  {
    path: "/courses",
    route: courseRouter,
  },
  {
    path: "/admins",
    route: AdminRoutes,
  },
  {
    path: "/academic-semesters",
    route: AcademicSemesterRoutes,
  },
  {
    path: "/academic-facultise",
    route: AcademicFacultyRouter,
  },
  {
    path: "/academic-department",
    route: AcademicDepartmentRoute,
  },
];
modulesRoute.forEach((route) => router.use(route.path, route.route));
export default router;
