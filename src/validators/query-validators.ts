import { z } from "zod";

export const QueryValidator = z.object({
  limit: z.number().optional(),
});

export type TQueryValidator = z.infer<typeof QueryValidator>;
