import { z } from "zod";

export const UpdateUserProfile = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Invalid email"),

  profile: z.string(),
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
});

export type TUpdateUserProfile = z.infer<typeof UpdateUserProfile>;
