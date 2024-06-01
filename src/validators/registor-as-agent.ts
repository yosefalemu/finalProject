import { z } from "zod";

export const RegistorAsAgentValidators = z.object({
  firstName: z
    .string({
      required_error: "First name is required",
      invalid_type_error: "First name must be a string",
    })
    .min(3, { message: "First name should be at least 3 characters long" })
    .regex(/^[a-zA-Z]+$/, { message: "First name must contain letters only" }),
  middleName: z
    .string({
      required_error: "Middle name is required",
      invalid_type_error: "Middle name must be a string",
    })
    .min(3, { message: "Middle name should be at least 3 characters long" })
    .regex(/^[a-zA-Z]+$/, { message: "Middle name must contain letters only" }),
  lastName: z
    .string({
      required_error: "Last name is required",
      invalid_type_error: "Last name must be a string",
    })
    .min(3, { message: "Last name should be at least 3 characters long" })
    .regex(/^[a-zA-Z]+$/, { message: "Last name must contain letters only" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Invalid email"),
  dateOfBirth: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      "Date of birth must be in the format YYYY-MM-DD"
    )
    .refine((dateString) => new Date(dateString) <= new Date(), {
      message: "Date of birth cannot be in the future",
    }),
  nationalId: z.string().superRefine((val, ctx) => {
    const normalizedValue = val.replace(/\s/g, "");

    if (normalizedValue.length === 16 && /^\d{16}$/.test(normalizedValue)) {
      if (/^\d{4} \d{4} \d{4} \d{4}$/.test(val)) {
        return val;
      } else {
        ctx.addIssue({
          code: "custom",
          message:
            "National ID must be formatted as four groups of four numeric digits separated by spaces",
        });
      }
    } else {
      ctx.addIssue({
        code: "custom",
        message: "National ID must be exactly 16 numeric digits",
      });
    }
  }),
  phoneNumber: z.string().refine((val) => {
    const normalizedValue = val.replace(/\s/g, "");
    return /^(09|07)\d{8}$/.test(normalizedValue);
  }, "Invalid phone number"),
  city: z
    .string()
    .min(1, { message: "City is required" })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "City name must contain letters and whitespace only",
    }),
  woreda: z
    .string()
    .min(1, { message: "Woreda is required" })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Woreda name must contain letters and whitespace only",
    }),
  kebele: z
    .string({
      required_error: "Kebele is required",
      invalid_type_error: "Kebele must be a number",
    })
    .refine((val) => /^\d+$/.test(val), "Kebele must be a numeric string"),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must be atleast 8 characters long" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long",
      }
    ),
  confirmPassword: z
    .string({ required_error: "Confirm password is required" })
    .min(8, { message: "Confirm password must be atleast 8 characters long" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      {
        message:
          "Confirm password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long",
      }
    ),
});

export type TRegistorAsAgentValidators = z.infer<
  typeof RegistorAsAgentValidators
>;
