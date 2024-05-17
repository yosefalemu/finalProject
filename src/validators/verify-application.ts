import { z } from "zod";

export const VerifyIndividualsApplication = z.object({
  controller: z.string(),
  applicationId: z.string(),
  approved: z.boolean(),
  message: z.string().optional(),
});

export type TVerifyIndividualsApplication = z.infer<
  typeof VerifyIndividualsApplication
>;

export const VerifyApplication = z.object({
  applicationId: z.string(),
});

export type TVerifyApplication = z.infer<typeof VerifyApplication>;

export const RejectApplication = z.object({
  applicationId: z.string(),
});

export type TRejectApplication = z.infer<typeof RejectApplication>;
