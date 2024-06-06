import { Model, Types } from "mongoose";

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo?: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type TuserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TStudent = {
  id: string;
  user: Types.ObjectId;
  password: string;
  name: TuserName;
  gender: "male" | "female" | "others";
  dateOfBirth?: Date;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup:
    | "A"
    | "B"
    | "AB"
    | "O"
    | "A+"
    | "B+"
    | "AB+"
    | "O+"
    | "A-"
    | "B-"
    | "AB-"
    | "O-";
  presentAddress: string;
  permanentAddress?: string; // Ensure this is the correct property name
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg?: string;
  // iaActive: "active" | "blocked";
  admissionSemester: Types.ObjectId;
  isDeleted: boolean;
  academicDepartment: Types.ObjectId;
};

export interface StudentModel extends Model<TStudent> {
  isUserExists(id: string): Promise<TStudent | null>;
}

// export type StudentMethods = {
//   isUserExists(id: string): Promise<TStudent | null>;
// };
// export type StudentModel = Model<
//   TStudent,
//   Record<string, never>,
//   StudentMethods
// >;
