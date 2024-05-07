import { getPayloadClient } from "../get-payload";
import { privateProcedure, router } from "./trpc";
import { z } from "zod";

export const screenerRouter = router({
  getApplication: privateProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100),
        cursor: z.number().nullish(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { cursor, limit } = input;
      const { user } = ctx;
      console.log("LIMIT IN PAYLOAD", limit);
      console.log("LOGGED IN USER IN PAYLOAD", user);

      const payload = await getPayloadClient();

      const page = cursor || 1;

      const {
        docs: items,
        hasNextPage,
        nextPage,
      } = await payload.find({
        collection: "applications",
        where: {
          responseOfClient: {
            equals: "pending",
          },
        },
        depth: 1,
        limit,
        page,
      });
      console.log("FOUND APPLICATION", items);

      return {
        items,
        nextPage: hasNextPage ? nextPage : null,
      };
    }),
});
