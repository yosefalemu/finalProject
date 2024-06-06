import { z } from "zod";
import { privateProcedure, router } from "./trpc";
import { getPayloadClient } from "../get-payload";

export const messageRoute = router({
  createMessage: privateProcedure
    .input(
      z.object({
        conversationId: z.string(),
        message: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const payload = await getPayloadClient();
      const { user } = ctx;
      const { conversationId, message } = input;

      // Create a new message
      const newMessage = await payload.create({
        collection: "mainMessage",
        data: {
          conversationId,
          message,
          sender: user.id,
        },
      });

      return { newMessage };
    }),

  getUserMessages: privateProcedure
    .input(
      z.object({
        conversationId: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const payload = await getPayloadClient();
      const { conversationId } = input;
      if (!conversationId) {
        return {
          items: [],
          nextPage: null,
        };
      }
      const { docs: items } = await payload.find({
        collection: "mainMessage",
        where: { conversationId: { equals: conversationId } },
        depth: 2,
        sort: "-createdAt",
      });

      return {
        items,
      };
    }),

  //   getUnViewedMessage: privateProcedure
  //     .input(
  //       z.object({
  //         id: z.string(),
  //         currentUserId: z.string(),
  //         isViewed: z.boolean(),
  //       })
  //     )
  //     .query(async ({ input }) => {
  //       const payload = await getPayloadClient();
  //       const { id, currentUserId, isViewed } = input;

  //       // Fetch unviewed messages
  //       const unviewedMessages = await payload.find({
  //         collection: "messages",
  //         where: {
  //           and: [
  //             { conversationId: { equals: id } },
  //             { isViewed: { equals: isViewed } },
  //           ],
  //         },
  //       });

  //       // Filter out messages sent by the current user
  //       const unviewedMessage = unviewedMessages.docs.filter(
  //         (item) => item.sender !== currentUserId
  //       );

  //       return unviewedMessage;
  //     }),

  //   updateMessageView: privateProcedure
  //     .input(
  //       z.object({
  //         id: z.string(),
  //         isViewed: z.boolean(),
  //       })
  //     )
  //     .mutation(async ({ input }) => {
  //       const payload = await getPayloadClient();
  //       const { id, isViewed } = input;

  //       // Update the isViewed field of a message
  //       const updatedMessage = await payload.update({
  //         collection: "mainMessage",
  //         id,
  //         data: {
  //           isViewed,
  //         },
  //         options: {
  //           runValidators: true,
  //           new: true,
  //         },
  //       });

  //       return updatedMessage;
  //     }),
});
