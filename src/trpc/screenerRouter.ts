import { getPayloadClient } from "../get-payload";
import { privateProcedure, router } from "./trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

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
      })
    )
    .mutation(async ({ input }) => {
      const { applicationId, controller, approved } = input;
      const payload = await getPayloadClient();
      //UPDATE FOR THE AGENT URL
      if (controller === "agentLogoUrl") {
        if (approved) {
          await payload.update({
            collection: "applications",
            id: applicationId,
            data: {
              statusAgentLogoUrl: "approved",
            },
          });
        } else {
          await payload.update({
            collection: "applications",
            id: applicationId,
            data: {
              statusAgentLogoUrl: "rejected",
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
            },
          });
        } else {
          await payload.update({
            collection: "applications",
            id: applicationId,
            data: {
              statusProfileUrl: "rejected",
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
            },
          });
        } else {
          await payload.update({
            collection: "applications",
            id: applicationId,
            data: {
              statusNationalIdUrl: "rejected",
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
            },
          });
        } else {
          await payload.update({
            collection: "applications",
            id: applicationId,
            data: {
              statusMedicalUrl: "rejected",
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
            },
          });
        } else {
          await payload.update({
            collection: "applications",
            id: applicationId,
            data: {
              statusEducationalUrl: "rejected",
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
            },
          });
        } else {
          await payload.update({
            collection: "applications",
            id: applicationId,
            data: {
              statusUniformDetailUrl: "rejected",
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
            },
          });
        } else {
          await payload.update({
            collection: "applications",
            id: applicationId,
            data: {
              statusEmployeeIdUrl: "rejected",
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
    .input(
      z.object({ applicationId: z.string(), rejectedDescriptions: z.string() })
    )
    .mutation(async ({ input }) => {
      const { applicationId, rejectedDescriptions } = input;
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
      } else {
        await payload.update({
          collection: "applications",
          id: applicationId,
          data: {
            responseOfScreener: "rejected",
            rejectedDescriptions: rejectedDescriptions,
          },
        });
      }
    }),
});
