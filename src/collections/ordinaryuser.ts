import { CollectionConfig } from "payload/types";

export const OrdinaryUser: CollectionConfig = {
  slug: "ordinaryUser",
  admin: {
    useAsTitle: "Ordinary users",
  },
  auth: {
    verify: {
      generateEmailHTML: ({ token }) => {
        return `<a href='${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}'>Verify email</a>`;
      },
    },
    tokenExpiration: 7200,
    maxLoginAttempts: 5,
    lockTime: 600 * 1000,
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
      name: "nationalIdVerified",
      required: true,
      type: "select",
      defaultValue: "pending",
      options: [
        {
          label: "Pending verification",
          value: "pending",
        },
        {
          label: "Approved",
          value: "approved",
        },
        {
          label: "Denied",
          value: "denied",
        },
      ],
    },
  ],
};
