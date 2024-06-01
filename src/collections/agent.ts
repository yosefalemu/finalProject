import { CollectionConfig } from "payload/types";

export const Agents: CollectionConfig = {
  slug: "agents",
  admin: {
    useAsTitle: "Agents",
    defaultColumns: ["id"],
  },
  auth: {
    verify: {},
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: "agentAdmin",
      type: "relationship",
      relationTo: "ordinaryUser",
      required: true,
    },
    { name: "randomPassword", type: "text", required: true },
    {
      name: "application",
      type: "relationship",
      relationTo: "applications",
      hasMany: false,
      required: true,
    },
    {
      name: "permission",
      type: "select",
      options: [
        { label: "Pending", value: "pending" },
        { label: "Allowed", value: "allowed" },
        { label: "Rejected", value: "rejected" },
      ],
      defaultValue: "pending",
    },
  ],
};
