import { CollectionConfig } from "payload/types";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "Users",
    defaultColumns: ["id"],
  },
  auth: {
    verify: {
      generateEmailHTML: () => {
        return `<a href='${process.env.NEXT_PUBLIC_SERVER_URL}/sign-in'>Sign in</a>`;
      },
    },
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: "firstName",
      required: true,
      type: "text",
    },
    {
      name: "middleName",
      required: true,
      type: "text",
    },
    {
      name: "lastName",
      required: true,
      type: "text",
    },
    {
      name: "nationalId",
      required: true,
      type: "text",
    },
    {
      name: "phoneNumber",
      required: true,
      type: "text",
    },
    {
      name: "sex",
      type: "select",
      required: true,
      options: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
      ],
    },
    {
      name: "role",
      type: "select",
      required: true,
      options: [
        { label: "Screener", value: "screener" },
        { label: "Manager", value: "manager" },
        { label: "Admin", value: "admin" },
      ],
    },
    {
      name: "dateOfBirth",
      type: "date",
      required: true,
    },
    { name: "profile", type: "text" },
    {
      name: "city",
      required: true,
      type: "text",
    },
    {
      name: "woreda",
      required: true,
      type: "text",
    },
    {
      name: "kebele",
      required: true,
      type: "text",
    },
    {
      name: "manager",
      type: "relationship",
      relationTo: "users",
      hasMany: false,
    },
    {
      name: "permission",
      type: "select",
      required: true,
      options: [
        { label: "Allowed", value: "allowed" },
        { label: "Rejected", value: "rejected" },
      ],
      defaultValue: "allowed",
    },
  ],
};
