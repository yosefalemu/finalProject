import { z } from "zod";

export const RejectAgent = z.object({
  rejectionReason: z.string(),
});

export type TRejectAgent = z.infer<typeof RejectAgent>;
