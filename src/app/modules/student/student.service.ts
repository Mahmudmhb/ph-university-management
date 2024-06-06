import mongoose from "mongoose";
import { TStudent } from "./student.interfase";
import { Student } from "./student.model";
import { User } from "../users/user.model";
import { object, record } from "zod";
import QueryBuilder from "../../builder/queryBuilder";
import { studentSerachTableFeild } from "./student.constent";

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  //   // const queryObj = { ...query };
  //   // console.log(queryObj);
  //   const studentSerachTableFeild = ["email", "name.firstName", "presentAddress"];

  //   let searchTerm = "";
  //   if (query?.searchTerm) {
  //     searchTerm = query?.searchTerm as string;
  //   }

  //   const searchQuery = Student.find({
  //     $or: studentSerachTableFeild.map((field) => ({
  //       [field]: { $regex: searchTerm, $options: "i" },
  //     })),
  //   });

  // const excludeFeilds = ["searchTerm"];
  // const excludeFields = ["searchTerm", "sort", "limit", "page", "fields"];

  // excludeFields.forEach((el) => delete queryObj[el]);

  // console.log({ query, queryObj });

  // const filterQuery = searchQuery
  //   .find(queryObj)
  // .populate("admissionSemester")
  // .populate({
  //   path: "academicDepartment",
  //   populate: {
  //     path: "academicFaculty",
  //   },
  //   });

  // let sort = "-createdAt";

  // if (query.sort) {
  //   sort = query.sort as string;
  // }

  // const sortQuery = filterQuery.sort(sort);

  // let limit = 1;
  // let page = 1;
  // let skip = 1;
  // if (query?.limit) {
  //   limit = Number(query.limit);
  // }
  // if (query?.limit) {
  //   limit = Number(query.limit);
  //   skip = (page - 1) * limit;
  // }
  // const paginateQuery = sortQuery.skip(skip);
  // const limitQuery = paginateQuery.limit(limit);

  // let fields = "-__v";

  // if (query?.fields) {
  //   fields = (query.fields as string).split(",").join(" ");
  //   console.log({ fields });
  // }
  // const fieldsQuery = await limitQuery.select(fields);
  // return fieldsQuery;
  const studentQuery = new QueryBuilder(
    Student.find()
      .populate("admissionSemester")
      .populate({
        path: "academicDepartment",
        populate: {
          path: "academicFaculty",
        },
      }),
    query
  )
    .search(studentSerachTableFeild)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await studentQuery.modelQuery;

  return result;
};
const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ _id: id });
  const result = await Student.findOne({ id })
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  return result;
};
const updateSingleStudentIntoDB = async (
  id: string,
  payload: Partial<TStudent>
) => {
  // const result = await Student.findOne({ _id: id });

  const { name, localGuardian, guardian, ...remainingStudentData } = payload;
  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });

  return result;
};
const deleteSingleStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );
    if (!deletedStudent) {
      throw new Error("Fail to deleted student");
    }
    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );
    if (!deletedUser) {
      throw new Error("Fail to deleted student");
    }

    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch {
    await session.abortTransaction();
    await session.endSession();
    throw new Error("faild to deleted student");
  }
};
export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteSingleStudentFromDB,
  updateSingleStudentIntoDB,
};
