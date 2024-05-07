import { z } from "zod";

export const ApplicationValidators = z.object({
  applier: z.string().min(1, { message: "Applier is required" }),
  agentName: z
    .string({
      required_error: "Agent name is required",
      invalid_type_error: "Agent name must be string",
    })
    .min(1, { message: "Agent name is required" })
    .min(3, { message: "Agent name can not be less than three" })
    .regex(/^[a-zA-Z\s]+$/, { message: "Agent name must contain letter only" }),
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
  sex: z.enum(["male", "female"]),
  houseNumber: z
    .string()
    .min(1, { message: "House number is required" })
    .regex(/^\d+$/, { message: "Please enter valid house number" }),
  agentLogoUrl: z.array(
    z.object({
      url: z.string().url(),
    })
  ),
  profileUrl: z.array(
    z.object({
      url: z.string().url(),
    })
  ),
  nationalIdUrls: z.array(
    z.object({
      url: z.string().url(),
    })
  ),
  medicalUrls: z.array(
    z.object({
      url: z.string().url(),
    })
  ),
  // footPrintUrl: z.array(
  //   z.object({
  //     url: z.string().url(),
  //   })
  // ),
  // jobExperienceUrls: z.array(
  //   z.object({
  //     url: z.string().url(),
  //   })
  // ),
  educationalUrls: z.array(
    z.object({
      url: z.string().url(),
    })
  ),
  // tradePermissionUrl: z.array(
  //   z.object({
  //     url: z.string().url(),
  //   })
  // ),
  // empQualificationAssuranceUrls: z.array(
  //   z.object({
  //     url: z.string().url(),
  //   })
  // ),
  // structureOfAgencyUrls: z.array(
  //   z.object({
  //     url: z.string().url(),
  //   })
  // ),
  // rulesUrls: z.array(
  //   z.object({
  //     url: z.string().url(),
  //   })
  // ),
  // formRegistrationUrls: z.array(
  //   z.object({
  //     url: z.string().url(),
  //   })
  // ),
  // warrantyUrls: z.array(
  //   z.object({
  //     url: z.string().url(),
  //   })
  // ),
  // bankStatementUrls: z.array(
  //   z.object({
  //     url: z.string().url(),
  //   })
  // ),
  // houseRentUrls: z.array(
  //   z.object({
  //     url: z.string().url(),
  //   })
  // ),
  uniformDetailsUrls: z.array(
    z.object({
      url: z.string().url(),
    })
  ),
  employeeIdUrls: z.array(
    z.object({
      url: z.string().url(),
    })
  ),
});

export type TApplicationValidator = z.infer<typeof ApplicationValidators>;
