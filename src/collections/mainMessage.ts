import { CollectionConfig } from "payload/types";

export const MainMessage: CollectionConfig = {
  slug: "mainMessage",
  fields: [
    {
      name: "conversationId",
      type: "relationship",
      relationTo: "mainConversation",
      hasMany: false,
    },
    {
      name: "sender",
      type: "relationship",
      relationTo: "users",
      hasMany: false,
    },
    {
      name: "message",
      type: "text",
    },
    {
      name: "isViewed",
      type: "select",
      options: [
        { label: "notViewed", value: "unViewed" },
        { label: "viewed", value: "viewed" },
      ],
      defaultValue:"unViewed"
    },
  ],
};
