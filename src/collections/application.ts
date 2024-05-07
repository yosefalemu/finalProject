import { CollectionConfig } from "payload/types";

export const Application: CollectionConfig = {
  slug: "applications",
  fields: [
    {
      name: "applier",
      type: "relationship",
      relationTo: "ordinaryUser",
      hasMany: false,
      required: true,
    },
    {
      name: "agentName",
      type: "text",
      required: true,
    },
    { name: "age", type: "text", required: true },
    {
      name: "sex",
      type: "select",
      required: true,
      options: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
      ],
    },
    { name: "houseNumber", type: "text", required: true },
    {
      name: "responseOfClient",
      type: "select",
      defaultValue: "pending",
      options: [
        { label: "Pending", value: "pending" },
        { label: "Approved", value: "approved" },
        { label: "Rejected", value: "rejected" },
      ],
    },
    {
      name: "responseOfManager",
      type: "select",
      defaultValue: "pending",
      options: [
        { label: "Pending", value: "pending" },
        { label: "Approved", value: "approved" },
        { label: "Rejected", value: "rejected" },
      ],
    },
    {
      name: "agentLogoUrl",
      type: "array",
      required: true,
      fields: [{ name: "url", type: "text" }],
    },
    {
      name: "profileUrl",
      type: "array",
      required: true,
      fields: [{ name: "url", type: "text" }],
    },
    {
      name: "nationalIdUrls",
      type: "array",
      required: true,
      fields: [{ name: "url", type: "text" }],
    },
    {
      name: "medicalUrls",
      type: "array",
      required: true,
      fields: [{ name: "url", type: "text" }],
    },
    // {
    //   name: "footPrintUrl",
    //   type: "array",
    //   required: true,
    //   fields: [{ name: "url", type: "text" }],
    // },
    // {
    //   name: "jobExperienceUrls",
    //   type: "array",
    //   required: true,
    //   fields: [{ name: "url", type: "text" }],
    // },
    {
      name: "educationalUrls",
      type: "array",
      required: true,
      fields: [{ name: "url", type: "text" }],
    },
    // {
    //   name: "tradePermissionUrl",
    //   type: "array",
    //   required: true,
    //   fields: [{ name: "url", type: "text" }],
    // },
    // {
    //   name: "empQualificationAssuranceUrls",
    //   type: "array",
    //   required: true,
    //   fields: [{ name: "url", type: "text" }],
    // },
    // {
    //   name: "structureOfAgencyUrls",
    //   type: "array",
    //   required: true,
    //   fields: [{ name: "url", type: "text" }],
    // },
    // {
    //   name: "rulesUrls",
    //   type: "array",
    //   required: true,
    //   fields: [{ name: "url", type: "text" }],
    // },
    // {
    //   name: "formRegistrationUrls",
    //   type: "array",
    //   required: true,
    //   fields: [{ name: "url", type: "text" }],
    // },
    // {
    //   name: "warrantyUrls",
    //   type: "array",
    //   required: true,
    //   fields: [{ name: "url", type: "text" }],
    // },
    // {
    //   name: "bankStatementUrls",
    //   type: "array",
    //   required: true,
    //   fields: [{ name: "url", type: "text" }],
    // },
    // {
    //   name: "houseRentUrls",
    //   type: "array",
    //   required: true,
    //   fields: [{ name: "url", type: "text" }],
    // },
    {
      name: "uniformDetailsUrls",
      type: "array",
      required: true,
      fields: [{ name: "url", type: "text" }],
    },
    {
      name: "employeeIdUrls",
      type: "array",
      required: true,
      fields: [{ name: "url", type: "text" }],
    },
  ],
};
