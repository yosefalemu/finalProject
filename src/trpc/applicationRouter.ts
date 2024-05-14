import { ApplicationValidators } from "../validators/application-validators";
import { privateProcedure, publicProcedure, router } from "./trpc";
import { getPayloadClient } from "../get-payload";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { User } from "@/payload-types";
import { ReApplicationValidators } from "../validators/reapply-validators";

export const applicationRouter = router({
  checkPersmission: publicProcedure
    .input(z.object({ applier: z.string() }))
    .query(async ({ input }) => {
      const { applier } = input;
      const payload = await getPayloadClient();
      const { docs: application } = await payload.find({
        collection: "applications",
        where: { applier: { equals: applier } },
      });
      if (application.length !== 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You have applied before please wait while we process",
        });
      }

      return { success: true, applicationFound: application };
    }),
  createApplication: publicProcedure
    .input(ApplicationValidators)
    .mutation(async ({ input }) => {
      const {
        applier,
        agentName,
        age,
        sex,
        houseNumber,
        agentLogoUrl,
        profileUrl,
        nationalIdUrls,
        medicalUrls,
        uniformDetailsUrls,
        employeeIdUrls,
        educationalUrls,
      } = input;

      const payload = await getPayloadClient();
      console.log("PAYLOAD", payload);

      const { docs: applicationFound } = await payload.find({
        collection: "applications",
        where: {
          or: [
            { agentName: { equals: agentName } },
            { applier: { equals: applier } },
          ],
        },
      });
      if (applicationFound.length !== 0) {
        const applierTaken = applicationFound.find(
          (application) => application.applier === applier
        );
        const agentNameTaken = applicationFound.find(
          (application) => application.agentName === agentName
        );
        if (applierTaken) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Agent name is taken",
          });
        } else if (agentNameTaken) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Agent name is taken",
          });
        } else {
        }
      }
      const { docs: screeners } = await payload.find({
        collection: "users",
        where: { role: { equals: "screener" } },
      });
      let selectedScreener: User | null = null;
      let selectedManager: User | null = null;
      if (screeners.length > 0) {
        const randomIndex = Math.floor(Math.random() * screeners.length);
        selectedScreener = screeners[randomIndex] as User;
      } else {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Please try again later",
        });
      }
      console.log("SELECTED SCREENER", selectedScreener);
      selectedManager = selectedScreener.manager as User;
      const selectedScreenerId = selectedScreener.id;
      const selectedManagerId = selectedManager.id;
      console.log("SELECTED SCREENER", selectedScreenerId);
      console.log("SELECTED MANAGER", selectedManagerId);

      await payload.create({
        collection: "applications",
        data: {
          applier,
          agentName,
          age,
          sex,
          houseNumber,
          agentLogoUrl,
          profileUrl,
          nationalIdUrls,
          medicalUrls,
          uniformDetailsUrls,
          employeeIdUrls,
          educationalUrls,
          selectedScreener: selectedScreenerId,
          selectedManager: selectedManagerId,
        },
      });
    }),
  reapplyApplication: privateProcedure
    .input(ReApplicationValidators)
    .mutation(async ({ input }) => {
      const {
        age,
        agentName,
        sex,
        houseNumber,
        applicationId,
        agentLogoUrl,
        educationalUrls,
        employeeIdUrls,
        medicalUrls,
        nationalIdUrls,
        profileUrl,
        uniformDetailsUrls,
      } = input;
      const payload = await getPayloadClient();

      const applicationFound = await payload.findByID({
        collection: "applications",
        id: applicationId,
      });

      if (
        applicationFound.statusAgentLogoUrl === "rejected" &&
        applicationFound.agentLogoUrl === agentLogoUrl
      ) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Agent logo is not changed!",
        });
      }
      if (
        applicationFound.statusProfileUrl === "rejected" &&
        applicationFound.profileUrl === profileUrl
      ) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Profile picture is not changed!",
        });
      }
      if (
        applicationFound.statusNationalIdUrl === "rejected" &&
        applicationFound.nationalIdUrls === nationalIdUrls
      ) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "National id is not changed!",
        });
      }
      if (
        applicationFound.statusMedicalUrl === "rejected" &&
        applicationFound.medicalUrls === medicalUrls
      ) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Medical files are not changed!",
        });
      }
      if (
        applicationFound.statusEducationalUrl === "rejected" &&
        applicationFound.educationalUrls === educationalUrls
      ) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Educational files are not changed!",
        });
      }
      if (
        applicationFound.statusUniformDetailUrl === "rejected" &&
        applicationFound.uniformDetailsUrls === uniformDetailsUrls
      ) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Uniform detail is not changed!",
        });
      }
      if (
        applicationFound.statusEmployeeIdUrl === "rejected" &&
        applicationFound.employeeIdUrls === employeeIdUrls
      ) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Employess id is not changed!",
        });
      }
      await payload.update({
        collection: "applications",
        id: applicationId,
        data: {
          age,
          agentName,
          sex,
          houseNumber,
          agentLogoUrl,
          profileUrl,
          nationalIdUrls,
          medicalUrls,
          educationalUrls,
          uniformDetailsUrls,
          employeeIdUrls,
          statusAgentLogoUrl: "pending",
          statusProfileUrl: "pending",
          statusNationalIdUrl: "pending",
          statusMedicalUrl: "pending",
          statusEducationalUrl: "pending",
          statusUniformDetailUrl: "pending",
          statusEmployeeIdUrl: "pending",
          agentLogoRejectionReason: "",
          profilePictureRejectionReason: "",
          nationalIdRejectionReason: "",
          medicalFilesRejectionReason: "",
          educationalFilesRejectionReason: "",
          uniformDetailRejectionReason: "",
          employeeIdRejectionReason: "",
          responseOfScreener: "pending",
          responseOfManager: "pending",
          rejectedDescriptions: "",
        },
      });
    }),

  getSingleApplication: privateProcedure
    .input(z.object({ applicationId: z.string() }))
    .query(async ({ input, ctx }) => {
      const { applicationId } = input;
      const payload = await getPayloadClient();
      const applicationFound = await payload.findByID({
        collection: "applications",
        id: applicationId,
      });
      return { applicationFound };
    }),
});
