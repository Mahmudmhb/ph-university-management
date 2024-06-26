import { z } from "zod";

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, "First name can't be more than 20 characters")
    .min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
});

const guardianValisatonSchema = z.object({
  fatherName: z.string().min(1, "Father's name is required"),
  fatherOccupation: z.string().min(1, "Father's occupation is required"),
  fatherContactNo: z.string().min(1, "Father's contact number is required"),
  motherName: z.string().min(1, "Mother's name is required"),
  motherOccupation: z.string().min(1, "Mother's occupation is required"),
  motherContactNo: z.string().optional(),
});

const localGuardianValidationSchema = z.object({
  name: z.string().min(1, "Local guardian's name is required"),
  occupation: z.string().min(1, "Local guardian's occupation is required"),
  contactNo: z.string().min(1, "Local guardian's contact number is required"),
  address: z.string().min(1, "Local guardian's address is required"),
});

const createStudentValidationSchema = z.object({
  body: z.object({
    // id: z.string().min(1, "Student ID is required"),
    password: z
      .string()
      .max(20, { message: "password needs will be 20 caracters" }),
    student: z.object({
      name: userNameValidationSchema,
      gender: z.enum(["male", "female", "others"], {
        errorMap: () => ({ message: "'{VALUE}' is not a valid gender" }),
      }),
      dateOfBirth: z.string().optional(),
      email: z.string().email("Invalid email address"),
      contactNo: z.string().min(1, "Contact number is required"),
      emergencyContactNo: z
        .string()
        .min(1, "Emergency contact number is required"),
      bloodGroup: z.enum(
        ["A", "B", "AB", "O", "A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"],
        {
          errorMap: () => ({ message: "'{VALUE}' is not a valid blood group" }),
        }
      ),
      presentAddress: z.string().min(1, "Present address is required"),
      permanentAddress: z.string().optional(),
      guardian: guardianValisatonSchema,
      localGuardian: localGuardianValidationSchema,
      profileImg: z.string().optional(),
      admissionSemester: z.string(),
      academicDepartment: z.string(),
      // iaActive: z.enum(["active", "blocked"]).default("active"),
      // isDeleted: z.boolean(),
    }),
  }),
});
const updateStudentValidationSchema = z.object({
  body: z
    .object({
      // id: z.string().min(1, "Student ID is required").optional(),
      // password: z
      //   .string()
      //   .max(20, { message: "Password needs to be 20 characters or less" })
      //   .optional(),
      student: z
        .object({
          name: userNameValidationSchema.optional(),
          gender: z
            .enum(["male", "female", "others"], {
              errorMap: () => ({ message: "'{VALUE}' is not a valid gender" }),
            })
            .optional(),
          dateOfBirth: z.string().optional(),
          email: z.string().email("Invalid email address").optional(),
          contactNo: z.string().min(1, "Contact number is required").optional(),
          emergencyContactNo: z
            .string()
            .min(1, "Emergency contact number is required")
            .optional(),
          bloodGroup: z
            .enum(
              [
                "A",
                "B",
                "AB",
                "O",
                "A+",
                "B+",
                "AB+",
                "O+",
                "A-",
                "B-",
                "AB-",
                "O-",
              ],
              {
                errorMap: () => ({
                  message: "'{VALUE}' is not a valid blood group",
                }),
              }
            )
            .optional(),
          presentAddress: z
            .string()
            .min(1, "Present address is required")
            .optional(),
          permanentAddress: z.string().optional(),
          guardian: guardianValisatonSchema.optional(),
          localGuardian: localGuardianValidationSchema.optional(),
          profileImg: z.string().optional(),
          admissionSemester: z.string().optional(),
          academicDepartment: z.string().optional(),
          // isActive: z.enum(["active", "blocked"]).default("active").optional(),
          // isDeleted: z.boolean().optional(),
        })
        .optional(),
    })
    .optional(),
});

export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
