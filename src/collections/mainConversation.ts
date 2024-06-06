import { CollectionConfig } from "payload/types";

export const MainConversation: CollectionConfig = {
  slug: "mainConversation",
  fields: [
    {
      name: "members",
      type: "relationship",
      hasMany: true,
      relationTo: "users",
    },
    { name: "participants", type: "text" },
  ],
};
