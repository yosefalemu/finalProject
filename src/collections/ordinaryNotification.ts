import { CollectionConfig } from "payload/types";

export const OrdinaryNotification: CollectionConfig = {
  slug: "ordinaryNotification",
  fields: [
    {
      name: "reciever",
      type: "relationship",
      relationTo: "ordinaryUser",
      hasMany: false,
      required: true,
    },
    {
      name: "sender",
      type: "relationship",
      relationTo: "users",
      hasMany: false,
      required: true,
    },
    {
      name: "application",
      type: "relationship",
      relationTo: "applications",
      hasMany: false,
      required: true,
    },
    { name: "message", type: "text", required: true },
    {
      name: "isViewed",
      type: "select",
      options: [
        { label: "Unseen", value: "unseen" },
        { label: "Seen", value: "seen" },
      ],
      defaultValue: "unseen",
    },
  ],
};
