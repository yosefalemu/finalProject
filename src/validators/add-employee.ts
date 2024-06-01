import { z } from "zod";

export const AddEmployee = z.object({
  firstName: z
    .string()
    .min(3, { message: "First name should be at least 3 characters long" })
    .regex(/^[a-zA-Z]+$/, { message: "First name must contain letters only" }),
  middleName: z
    .string()
    .min(3, { message: "Middle name should be at least 3 characters long" })
    .regex(/^[a-zA-Z]+$/, { message: "Middle name must contain letters only" }),
  lastName: z
    .string()
    .min(3, { message: "Last name should be at least 3 characters long" })
    .regex(/^[a-zA-Z]+$/, { message: "Last name must contain letters only" }),
  sex: z
    .string()
    .min(1, { message: "Sex is required" })
    .transform((val) => val.toLowerCase())
    .refine((val) => ["male", "female"].includes(val), {
      message: "Sex must be either 'male' or 'female'",
    }),
  age: z
    .string()
    .min(1, { message: "Age is required" })
    .regex(/^\d+$/, { message: "Please enter valid age" })
    .superRefine((val, ctx) => {
      if (parseInt(val) < 18) {
        ctx.addIssue({
          code: "custom",
          message: "Age should be greater than 18",
        });
      }
    }),
  educationLevel: z
    .string()
    .min(1, { message: "Educational level is required" })
    .transform((val) => val.toLowerCase())
    .refine(
      (val) =>
        [
          "upper_primary",
          "secondary_education",
          "general_secondary",
          "preparatory_secondary",
          "tertiary_education",
          "certificate_programs",
          "diploma_programs",
          "bachelors_degree",
          "masters_degree",
          "doctoral_degree",
        ].includes(val),
      {
        message: "Educational level must be valid",
      }
    ),
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
  dateOfEmployement: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      "Date of employement must be in the format YYYY-MM-DD"
    )
    .refine((dateString) => new Date(dateString) <= new Date(), {
      message: "Date of employement cannot be in the future",
    }),
  forensicRecordsUrls: z
    .string()
    .min(1, { message: "Forensic records are required" }),
  medicalExaminationUrls: z
    .string()
    .min(1, { message: "Medical examinaton is required" }),
  regionofemployment: z
    .string()
    .min(3, { message: "Region of employment shoud be valid" }),
  cityofemployment: z
    .string()
    .min(3, { message: "City of employment shoud be valid" }),
  specificplaceofemployment: z
    .string()
    .min(3, { message: "Specific place of employment shoud be valid" }),
  employmentposition: z
    .string()
    .min(3, { message: "Employment position shoud be valid" }),
  region: z.string().min(3, { message: "Region shoud be valid" }),
  zone: z.string().min(3, { message: "Zone shoud be valid" }),
  woreda: z.string().min(3, { message: "Woreda shoud be valid" }),
  kebele: z
    .string({
      required_error: "Kebele is required",
      invalid_type_error: "Kebele must be a number",
    })
    .refine((val) => /^\d+$/.test(val), "Kebele must be a numeric string"),
  houseNumber: z.string().min(3, { message: "House Number shoud be valid" }),
  martialStatus: z
    .string()
    .min(1, { message: "Martial status is required" })
    .transform((val) => val.toLowerCase())
    .refine((val) => ["single", "married", "divorced"].includes(val), {
      message: "Martial status should be valid",
    }),
  getCoughtFirstName: z
    .string()
    .min(3, { message: "First name should be at least 3 characters long" })
    .regex(/^[a-zA-Z]+$/, { message: "First name must contain letters only" }),
  getCoughtMiddleName: z
    .string()
    .min(3, { message: "Middle name should be at least 3 characters long" })
    .regex(/^[a-zA-Z]+$/, { message: "Middle name must contain letters only" }),
  getCoughtLastName: z
    .string()
    .min(3, { message: "Last name should be at least 3 characters long" })
    .regex(/^[a-zA-Z]+$/, { message: "Last name must contain letters only" }),
  getCoughtRegion: z.string().min(3, { message: "Region shoud be valid" }),
  getCoughtZone: z.string().min(3, { message: "Zone shoud be valid" }),
  getCoughtKebele: z
    .string({
      required_error: "Kebele is required",
      invalid_type_error: "Kebele must be a number",
    })
    .refine((val) => /^\d+$/.test(val), "Kebele must be a numeric string"),
  getCoughtHouseNumber: z
    .string()
    .min(3, { message: "House Number shoud be valid" }),
  getCoughtNationalId: z.string().superRefine((val, ctx) => {
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
  getCoughtPhoneNumber: z.string().refine((val) => {
    const normalizedValue = val.replace(/\s/g, "");
    return /^(09|07)\d{8}$/.test(normalizedValue);
  }, "Invalid phone number"),
});

export type TAddEmployee = z.infer<typeof AddEmployee>;
