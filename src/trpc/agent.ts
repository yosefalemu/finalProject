import { z } from "zod";
import { privateProcedure, router } from "./trpc";
import { getPayloadClient } from "../get-payload";
import { Application, OrdinaryUser } from "@/payload-types";

export const agentRouter = router({
  getAgents: privateProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100),
        cursor: z.number().nullish(),
      })
    )
    .query(async ({ input }) => {
      const { cursor, limit } = input;
      const payload = await getPayloadClient();

      const page = cursor || 1;

      const {
        docs: items,
        hasNextPage,
        nextPage,
      } = await payload.find({
        collection: "agents",
        depth: 2,
        limit,
        page,
      });
      console.log("AGENT FOUND", items);

      return {
        items,
        nextPage: hasNextPage ? nextPage : null,
      };
    }),
  verifyAgentFirstTime: privateProcedure
    .input(z.object({ agentId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { agentId } = input;
      const { user } = ctx;
      const payload = getPayloadClient();

      const agentFound = (await payload).findByID({
        collection: "agents",
        id: agentId,
      });
      const agentAdmin = (await agentFound).agentAdmin as OrdinaryUser;
      const application = (await agentFound).application as Application;

      (await payload).update({
        collection: "agents",
        id: agentId,
        data: {
          _verified: true,
          _verificationToken: null,
          permission: "allowed",
        },
      });
      (await payload).create({
        collection: "ordinaryNotification",
        data: {
          sender: user.id,
          reciever: agentAdmin.id,
          message: `Congratulations, Dear ${agentAdmin.firstName}  ${
            agentAdmin.middleName
          } ${
            agentAdmin.lastName
          } you've been granted access to the system! Your temporary password is provided below. Please ensure you update it at your earliest convenience for security purposes. Here’s your password: ${
            (await agentFound).randomPassword
          }`,
          application: application.id as string,
        },
      });
    }),
  verifyAgent: privateProcedure
    .input(z.object({ agentId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { agentId } = input;
      const { user } = ctx;
      const payload = getPayloadClient();

      const agentFound = (await payload).findByID({
        collection: "agents",
        id: agentId,
      });
      const agentAdmin = (await agentFound).agentAdmin as OrdinaryUser;
      const application = (await agentFound).application as Application;

      (await payload).update({
        collection: "agents",
        id: agentId,
        data: {
          permission: "allowed",
        },
      });

      (await payload).create({
        collection: "ordinaryNotification",
        data: {
          sender: user.id,
          reciever: agentAdmin.id,
          message: `Congratulations, you've been granted access to the system!`,
          application: application.id as string,
        },
      });
    }),
  rejectAgent: privateProcedure
    .input(z.object({ agentId: z.string(), rejectionReason: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { agentId, rejectionReason } = input;
      const { user } = ctx;
      const payload = getPayloadClient();

      const agentFound = (await payload).findByID({
        collection: "agents",
        id: agentId,
      });
      const application = (await agentFound).application as Application;
      (await payload).update({
        collection: "agents",
        id: agentId,
        data: {
          permission: "rejected",
        },
      });
      (await payload).create({
        collection: "ordinaryNotification",
        data: {
          sender: user.id,
          reciever: (await agentFound).id,
          message: rejectionReason,
          application: application.id as string,
        },
      });
    }),
});
