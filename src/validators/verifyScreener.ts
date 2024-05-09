import { z } from "zod";

export const VerifyIndividualsApplicationByScreener = z.object({
  controller: z.string(),
  applicationId: z.string(),
  approved: z.boolean(),
});

export type TVerifyIndividualsApplicationByScreener = z.infer<
  typeof VerifyIndividualsApplicationByScreener
>;

export const VerifyApplicationByScreener = z.object({
  applicationId: z.string(),
});

export type TVerifyApplicationByScreener = z.infer<
  typeof VerifyApplicationByScreener
>;

export const RejectApplicationByScreener = z.object({
  applicationId: z.string(),
  rejectedDescriptions: z.string(),
});

export type TRejectApplicationByScreener = z.infer<
  typeof RejectApplicationByScreener
>;
