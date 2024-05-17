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
      type: "text",
      required: true,
    },
    { name: "houseNumber", type: "text", required: true },
    {
      name: "agentLogoUrl",
      type: "text",
      required: true,
    },
    {
      name: "statusAgentLogoUrl",
      type: "select",
      defaultValue: "pending",
      options: [
        { label: "Pending", value: "pending" },
        { label: "Approved", value: "approved" },
        { label: "Rejected", value: "rejected" },
      ],
    },
    {
      name: "agentLogoRejectionReason",
      type: "textarea",
      required: false,
    },
    {
      name: "profileUrl",
      type: "text",
      required: true,
    },
    {
      name: "statusProfileUrl",
      type: "select",
      defaultValue: "pending",
      options: [
        { label: "Pending", value: "pending" },
        { label: "Approved", value: "approved" },
        { label: "Rejected", value: "rejected" },
      ],
    },
    {
      name: "profilePictureRejectionReason",
      type: "textarea",
      required: false,
    },
    {
      name: "nationalIdUrls",
      type: "text",
      required: true,
    },
    {
      name: "statusNationalIdUrl",
      type: "select",
      defaultValue: "pending",
      options: [
        { label: "Pending", value: "pending" },
        { label: "Approved", value: "approved" },
        { label: "Rejected", value: "rejected" },
      ],
    },
    {
      name: "nationalIdRejectionReason",
      type: "textarea",
      required: false,
    },
    {
      name: "medicalUrls",
      type: "text",
      required: true,
    },
    {
      name: "statusMedicalUrl",
      type: "select",
      defaultValue: "pending",
      options: [
        { label: "Pending", value: "pending" },
        { label: "Approved", value: "approved" },
        { label: "Rejected", value: "rejected" },
      ],
    },
    {
      name: "medicalFilesRejectionReason",
      type: "textarea",
      required: false,
    },
    // {
    //   name: "footPrintUrl",
    //   type: "text",
    //   required: true,
    // },
    // {
    //   name: "jobExperienceUrls",
    //   type: "text",
    //   required: true,
    // },
    {
      name: "educationalUrls",
      type: "text",
      required: true,
    },
    {
      name: "statusEducationalUrl",
      type: "select",
      defaultValue: "pending",
      options: [
        { label: "Pending", value: "pending" },
        { label: "Approved", value: "approved" },
        { label: "Rejected", value: "rejected" },
      ],
    },
    {
      name: "educationalFilesRejectionReason",
      type: "textarea",
      required: false,
    },
    // {
    //   name: "tradePermissionUrl",
    //   type: "text",
    //   required: true,
    // },
    // {
    //   name: "empQualificationAssuranceUrls",
    //   type: "text",
    //   required: true,
    // },
    // {
    //   name: "structureOfAgencyUrls",
    //   type: "text",
    //   required: true,
    // },
    // {
    //   name: "rulesUrls",
    //   type: "text",
    //   required: true,
    // },
    // {
    //   name: "formRegistrationUrls",
    //   type: "text",
    //   required: true,
    // },
    // {
    //   name: "warrantyUrls",
    //   type: "text",
    //   required: true,
    // },
    // {
    //   name: "bankStatementUrls",
    //   type: "text",
    //   required: true,
    // },
    // {
    //   name: "houseRentUrls",
    //   type: "text",
    //   required: true,
    // },
    {
      name: "uniformDetailsUrls",
      type: "text",
      required: true,
    },
    {
      name: "statusUniformDetailUrl",
      type: "select",
      defaultValue: "pending",
      options: [
        { label: "Pending", value: "pending" },
        { label: "Approved", value: "approved" },
        { label: "Rejected", value: "rejected" },
      ],
    },
    {
      name: "uniformDetailRejectionReason",
      type: "textarea",
      required: false,
    },
    {
      name: "employeeIdUrls",
      type: "text",
      required: true,
    },
    {
      name: "statusEmployeeIdUrl",
      type: "select",
      defaultValue: "pending",
      options: [
        { label: "Pending", value: "pending" },
        { label: "Approved", value: "approved" },
        { label: "Rejected", value: "rejected" },
      ],
    },
    {
      name: "employeeIdRejectionReason",
      type: "textarea",
      required: false,
    },
    {
      name: "responseOfScreener",
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
      name: "selectedScreener",
      type: "relationship",
      required: true,
      relationTo: "users",
      hasMany: false,
    },
    {
      name: "selectedManager",
      type: "relationship",
      required: true,
      relationTo: "users",
      hasMany: false,
    },
  ],
};
