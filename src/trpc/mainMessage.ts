import { z } from "zod";
import { privateProcedure, router } from "./trpc";
import { getPayloadClient } from "../get-payload";
import { MainMessage, User } from "@/payload-types";

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

  getUnViewedMessage: privateProcedure
    .input(
      z.object({
        conversationId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const payload = await getPayloadClient();
      const { conversationId } = input;
      const { user } = ctx;
      const userId = user.id;
      console.log("USER ID FOR MESSAGES", userId);

      // Fetch unviewed messages
      const { docs: unviewedMessages } = await payload.find({
        collection: "mainMessage",
        where: {
          and: [
            { conversationId: { equals: conversationId } },
            { isViewed: { equals: "unViewed" } },
          ],
        },
        depth: 2,
      });

      // Manually filter out messages where the sender is the current user
      const filteredUnviewedMessages = unviewedMessages.filter(
        (msg: MainMessage) => (msg.sender as User).id !== userId
      );

      return { unviewedMessages: filteredUnviewedMessages };
    }),

  updateMessageView: privateProcedure
    .input(
      z.object({
        conversationId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const payload = await getPayloadClient();
      const { conversationId } = input;
      const { user } = ctx;
      const userId = user.id;
      console.log("USER ID FOR MESSAGES", userId);

      // Fetch unviewed messages first
      const { docs: unviewedMessages } = await payload.find({
        collection: "mainMessage",
        where: {
          and: [
            { conversationId: { equals: conversationId } },
            { isViewed: { equals: "unViewed" } },
          ],
        },
        depth: 2,
      });

      // Manually filter out messages where the sender is the current user
      const filteredUnviewedMessages = unviewedMessages.filter(
        (msg: MainMessage) => (msg.sender as User).id !== userId
      );

      // Update the isViewed field of each filtered message
      const updatedMessages = await Promise.all(
        filteredUnviewedMessages.map((msg) =>
          payload.update({
            collection: "mainMessage",
            id: msg.id,
            data: { isViewed: "viewed" },
          })
        )
      );

      return { updatedMessages };
    }),
  getAllUnviewedMessages: privateProcedure.query(async ({ ctx }) => {
    console.log("START HERE THE PAYLOAD");

    const payload = await getPayloadClient();
    const { user } = ctx;
    const userId = user.id;

    // Fetch conversations where the user is a member
    const { docs: userConversations } = await payload.find({
      collection: "mainConversation",
      where: {
        members: {
          contains: userId,
        },
      },
    });

    // Initialize an array to hold all unviewed messages
    let allUnviewedMessages: MainMessage[] = [];

    // Loop through each conversation to fetch unviewed messages
    for (const conversation of userConversations) {
      const { docs: unviewedMessages } = await payload.find({
        collection: "mainMessage",
        where: {
          and: [
            { conversationId: { equals: conversation.id } },
            { isViewed: { equals: "unViewed" } },
          ],
        },
        depth: 2,
      });

      // Filter out messages where the sender is the current user
      const filteredUnviewedMessages = unviewedMessages.filter(
        (msg: MainMessage) => (msg.sender as User).id !== userId
      );

      // Add the filtered messages to the main array
      allUnviewedMessages = allUnviewedMessages.concat(
        filteredUnviewedMessages
      );
    }

    return { unviewedMessages: allUnviewedMessages };
  }),
});
