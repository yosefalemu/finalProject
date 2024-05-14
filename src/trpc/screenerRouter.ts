import { getPayloadClient } from "../get-payload";
import { privateProcedure, router } from "./trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { OrdinaryUser } from "@/payload-types";

export const screenerRouter = router({
  getApplicationForScreener: privateProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100),
        cursor: z.number().nullish(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { cursor, limit } = input;
      const { user } = ctx;
      console.log("LIMIT IN PAYLOAD", limit);

      const payload = await getPayloadClient();

      const page = cursor || 1;

      const {
        docs: items,
        hasNextPage,
        nextPage,
      } = await payload.find({
        collection: "applications",
        where: {
          and: [
            {
              responseOfScreener: {
                equals: "pending",
              },
            },
            {
              selectedScreener: {
                equals: user.id,
              },
            },
          ],
        },
        depth: 1,
        limit,
        page,
      });
      console.log("FOUND APPLICATION", items);

      return {
        items,
        nextPage: hasNextPage ? nextPage : null,
      };
    }),
  getSingleApplication: privateProcedure
    .input(z.object({ applicationId: z.string() }))
    .query(async ({ input }) => {
      const { applicationId } = input;
      const payload = await getPayloadClient();
      const applicationFound = await payload.findByID({
        collection: "applications",
        id: applicationId,
      });
      if (!applicationFound) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Application not found",
        });
      }
      return applicationFound;
    }),
  verifyIndividualsByScreener: privateProcedure
    .input(
      z.object({
        controller: z.string(),
        applicationId: z.string(),
        approved: z.boolean(),
        message: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { applicationId, controller, approved, message } = input;
      const payload = await getPayloadClient();
      //UPDATE FOR THE AGENT URL
      if (controller === "agentLogoUrl") {
        if (approved) {
          await payload.update({
            collection: "applications",
            id: applicationId,
            data: {
              statusAgentLogoUrl: "approved",
              agentLogoRejectionReason: "",
            },
          });
        } else {
          await payload.update({
            collection: "applications",
            id: applicationId,
            data: {
              statusAgentLogoUrl: "rejected",
              agentLogoRejectionReason: message,
            },
          });
        }
      }
      //UPDATE FOR THE PROFILE PICTURE
      if (controller === "profileUrl") {
        if (approved) {
          await payload.update({
            collection: "applications",
            id: applicationId,
            data: {
              statusProfileUrl: "approved",
              profilePictureRejectionReason: "",
            },
          });
        } else {
          await payload.update({
            collection: "applications",
            id: applicationId,
            data: {
              statusProfileUrl: "rejected",
              profilePictureRejectionReason: message,
            },
          });
        }
      }
      //UPDATE FOR THE NATIONAL ID
      if (controller === "nationalIdUrls") {
        if (approved) {
          await payload.update({
            collection: "applications",
            id: applicationId,
            data: {
              statusNationalIdUrl: "approved",
              nationalIdRejectionReason: "",
            },
          });
        } else {
          await payload.update({
            collection: "applications",
            id: applicationId,
            data: {
              statusNationalIdUrl: "rejected",
              nationalIdRejectionReason: message,
            },
          });
        }
      }
      //UPDATE FOR MEDICALS
      if (controller === "medicalUrls") {
        if (approved) {
          await payload.update({
            collection: "applications",
            id: applicationId,
            data: {
              statusMedicalUrl: "approved",
              medicalFilesRejectionReason: "",
            },
          });
        } else {
          await payload.update({
            collection: "applications",
            id: applicationId,
            data: {
              statusMedicalUrl: "rejected",
              medicalFilesRejectionReason: message,
            },
          });
        }
      }
      //UPDATE FOR EDUCATION URL
      if (controller === "educationalUrls") {
        if (approved) {
          await payload.update({
            collection: "applications",
            id: applicationId,
            data: {
              statusEducationalUrl: "approved",
              educationalFilesRejectionReason: "",
            },
          });
        } else {
          await payload.update({
            collection: "applications",
            id: applicationId,
            data: {
              statusEducationalUrl: "rejected",
              educationalFilesRejectionReason: message,
            },
          });
        }
      }
      //UPDATE FOR UNIFORM DETAILS
      if (controller === "uniformDetailsUrls") {
        if (approved) {
          await payload.update({
            collection: "applications",
            id: applicationId,
            data: {
              statusUniformDetailUrl: "approved",
              uniformDetailRejectionReason: "",
            },
          });
        } else {
          await payload.update({
            collection: "applications",
            id: applicationId,
            data: {
              statusUniformDetailUrl: "rejected",
              uniformDetailRejectionReason: message,
            },
          });
        }
      }
      //UPDATE FOR EMPLOYEE ID
      if (controller === "employeeIdUrls") {
        if (approved) {
          await payload.update({
            collection: "applications",
            id: applicationId,
            data: {
              statusEmployeeIdUrl: "approved",
              employeeIdRejectionReason: "",
            },
          });
        } else {
          await payload.update({
            collection: "applications",
            id: applicationId,
            data: {
              statusEmployeeIdUrl: "rejected",
              employeeIdRejectionReason: message,
            },
          });
        }
      }
    }),
  approveByScreener: privateProcedure
    .input(z.object({ applicationId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { applicationId } = input;
      const payload = await getPayloadClient();
      const applicationFound = await payload.findByID({
        collection: "applications",
        id: applicationId,
      });
      if (applicationFound.statusAgentLogoUrl !== "approved") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Agent logo is not approved yet!",
        });
      } else if (applicationFound.statusProfileUrl !== "approved") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Profile picture is not approved yet!",
        });
      } else if (applicationFound.statusNationalIdUrl !== "approved") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "National id is not approved yet!",
        });
      } else if (applicationFound.statusEducationalUrl !== "approved") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Educational files is not approved yet!",
        });
      } else if (applicationFound.statusMedicalUrl !== "approved") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Medical files is not approved yet!",
        });
      } else if (applicationFound.statusEmployeeIdUrl !== "approved") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Employee id is not approved yet!",
        });
      } else if (applicationFound.statusUniformDetailUrl !== "approved") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Uniform detail is not approved yet!",
        });
      } else {
        await payload.update({
          collection: "applications",
          id: applicationId,
          data: { responseOfScreener: "approved" },
        });
      }
    }),
  rejectByScreener: privateProcedure
    .input(z.object({ applicationId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { user } = ctx;
      const { applicationId } = input;
      const payload = await getPayloadClient();
      const applicationFound = await payload.findByID({
        collection: "applications",
        id: applicationId,
      });
      if (applicationFound.statusAgentLogoUrl === "pending") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Agent logo is not validated yet!",
        });
      } else if (applicationFound.statusProfileUrl === "pending") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Profile picture is not validate yet!",
        });
      } else if (applicationFound.statusNationalIdUrl === "pending") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "National id is not validate yet!",
        });
      } else if (applicationFound.statusEducationalUrl === "pending") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Educational files are not validate yet!",
        });
      } else if (applicationFound.statusMedicalUrl === "pending") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Medical files are not validate yet!",
        });
      } else if (applicationFound.statusEmployeeIdUrl === "pending") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Employee id is not validate yet",
        });
      } else if (applicationFound.statusUniformDetailUrl === "pending") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Uniform detail is not validate yet!",
        });
      } else if (applicationFound.responseOfScreener === "rejected") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Application is already rejected!",
        });
      } else {
        await payload.update({
          collection: "applications",
          id: applicationId,
          data: {
            responseOfScreener: "rejected",
          },
        });
        const applier = applicationFound.applier as OrdinaryUser;
        console.log("APPLIER", applier);
        await payload.create({
          collection: "ordinaryNotification",
          data: {
            application: applicationId,
            reciever: applier.id,
            sender: user.id,
            message: "Rejection of your application",
          },
        });
      }
    }),
});
