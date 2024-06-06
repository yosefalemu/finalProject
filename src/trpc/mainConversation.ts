import { z } from "zod";
import { privateProcedure, router } from "./trpc";
import { getPayloadClient } from "../get-payload";
import { TRPCError } from "@trpc/server";
import { User } from "@/payload-types";

export const conversationRoute = router({
  getNewUserForConversation: privateProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100),
        cursor: z.number().nullish(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { user } = ctx;
      const payload = await getPayloadClient();
      const { limit, cursor } = input;

      // Fetch conversations that include the current user
      const userConversations = await payload.find({
        collection: "mainConversation",
        where: { members: { in: [user.id] } },
      });

      // Extract user IDs the current user has conversations with
      const userIdsInConversations = new Set();
      userConversations.docs.forEach((conversation) => {
        if (conversation.members) {
          conversation.members.forEach((member) => {
            if (
              typeof member === "object" &&
              member !== null &&
              "id" in member
            ) {
              if (member.id !== user.id) {
                userIdsInConversations.add(member.id);
              }
            } else if (typeof member === "string" && member !== user.id) {
              userIdsInConversations.add(member);
            }
          });
        }
      });

      // Fetch all users
      const allUsers = await payload.find({
        collection: "users",
        limit,
        page: cursor || 1,
      });

      // Filter out users that the current user has conversations with
      const availableUsers = allUsers.docs.filter(
        (userItem) =>
          !userIdsInConversations.has(userItem.id) && userItem.id !== user.id
      );

      return { availableUsers };
    }),
  createConversation: privateProcedure
    .input(z.object({ recieverId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const payload = await getPayloadClient();
      const { recieverId } = input;
      const { user } = ctx;
      const senderId = user.id;
      const { docs: chatExist } = await payload.find({
        collection: "mainConversation",
        where: {
          and: [
            { members: { in: [senderId] } },
            { members: { in: [recieverId] } },
          ],
        },
      });
      if (chatExist.length > 0) {
        return { chatExist: chatExist[0] };
      }
      const newChat = await payload.create({
        collection: "mainConversation",
        data: {
          members: [senderId, recieverId],
        },
      });
      return { newChat: newChat };
    }),
  getUserConversation: privateProcedure.query(async ({ ctx }) => {
    const { user } = ctx;
    const payload = await getPayloadClient();
    const { docs: items } = await payload.find({
      collection: "mainConversation",
      where: { members: { in: [user.id] } },
      depth: 2,
      sort: "-createdAt",
    });
    return {
      items,
    };
  }),
  updateConversation: privateProcedure
    .input(z.object({ conversationId: z.string() }))
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();
      const { conversationId } = input;

      // Update the conversation's updatedAt field
      const updatedConversation = await payload.update({
        collection: "mainConversation",
        id: conversationId,
        data: {
          updatedAt: new Date().toISOString(),
        },
      });

      if (!updatedConversation) {
        throw new Error(`No conversation found with id ${conversationId}`);
      }

      return updatedConversation;
    }),
});
