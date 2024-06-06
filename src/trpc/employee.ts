import { Agent, OrdinaryUser } from "@/payload-types";
import { getPayloadClient } from "../get-payload";
import { AddEmployee } from "../validators/add-employee";
import { privateProcedureAgent, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const employeeRoute = router({
  createEmployee: privateProcedureAgent
    .input(AddEmployee)
    .mutation(async ({ input, ctx }) => {
      const { user } = ctx;
      console.log("AGENT ID", user.id);
      const {
        firstName,
        middleName,
        lastName,
        sex,
        age,
        educationLevel,
        nationalId,
        phoneNumber,
        dateOfEmployement,
        forensicRecordsUrls,
        medicalExaminationUrls,
        regionofemployment,
        cityofemployment,
        specificplaceofemployment,
        employmentposition,
        region,
        zone,
        woreda,
        kebele,
        houseNumber,
        martialStatus,
        getCoughtFirstName,
        getCoughtMiddleName,
        getCoughtLastName,
        getCoughtRegion,
        getCoughtZone,
        getCoughtKebele,
        getCoughtHouseNumber,
        getCoughtNationalId,
        getCoughtPhoneNumber,
      } = input;
      const payload = await getPayloadClient();

      const agentFound = await payload.findByID({
        collection: "agents",
        id: user.id,
      });

      const { docs: empPrevRecords } = await payload.find({
        collection: "employee",
        where: { nationalId: { equals: nationalId } },
      });
      console.log("EMPLOYEE PREV RECORDS", empPrevRecords);

      if (empPrevRecords.length > 0) {
        const existingEmployee = empPrevRecords[0];
        if (existingEmployee.status === "employeed") {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Employee has previous records please contact us!",
          });
        } else if (existingEmployee.status === "free") {
          const updatedPrevAgents = Array.isArray(existingEmployee.prevAgents)
            ? [
                ...new Set(
                  existingEmployee.prevAgents
                    .map((agent) =>
                      typeof agent === "string" ? agent : agent.id
                    )
                    .concat(agentFound.id)
                ),
              ]
            : [agentFound.id];

          await payload.update({
            collection: "employee",
            id: existingEmployee.id,
            data: {
              prevAgents: updatedPrevAgents,
              status: "employeed",
              activeAgent: agentFound.id,
              firstName,
              middleName,
              lastName,
              sex,
              age,
              educationLevel,
              nationalId,
              phoneNumber,
              dateOfEmployement,
              forensicRecordsUrls,
              medicalExaminationUrls,
              regionofemployment,
              cityofemployment,
              specificplaceofemployment,
              employmentposition,
              region,
              zone,
              woreda,
              kebele,
              houseNumber,
              martialStatus,
              getCoughtFirstName,
              getCoughtMiddleName,
              getCoughtLastName,
              getCoughtRegion,
              getCoughtZone,
              getCoughtKebele,
              getCoughtHouseNumber,
              getCoughtNationalId,
              getCoughtPhoneNumber,
            },
          });
          return { success: true };
        }
      }

      await payload.create({
        collection: "employee",
        data: {
          prevAgents: [agentFound.id],
          status: "employeed",
          activeAgent: agentFound.id,
          firstName,
          middleName,
          lastName,
          sex,
          age,
          educationLevel,
          nationalId,
          phoneNumber,
          dateOfEmployement,
          forensicRecordsUrls,
          medicalExaminationUrls,
          regionofemployment,
          cityofemployment,
          specificplaceofemployment,
          employmentposition,
          region,
          zone,
          woreda,
          kebele,
          houseNumber,
          martialStatus,
          getCoughtFirstName,
          getCoughtMiddleName,
          getCoughtLastName,
          getCoughtRegion,
          getCoughtZone,
          getCoughtKebele,
          getCoughtHouseNumber,
          getCoughtNationalId,
          getCoughtPhoneNumber,
        },
      });
      return { success: true };
    }),
  getAgentEmployees: privateProcedureAgent
    .input(
      z.object({
        limit: z.number().min(1).max(100),
        cursor: z.number().nullish(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { limit, cursor } = input;
      const payload = await getPayloadClient();
      const page = cursor || 1;
      const { user } = ctx;

      const {
        docs: items,
        hasNextPage,
        nextPage,
      } = await payload.find({
        collection: "employee",
        where: { activeAgent: { equals: user.id } },
        depth: 2,
        limit,
        page,
      });
      console.log("EMPLOYEE FOUND", items);

      return {
        items,
        nextPage: hasNextPage ? nextPage : null,
      };
    }),
  getAgentEmployeesManager: privateProcedureAgent
    .input(
      z.object({
        limit: z.number().min(1).max(100),
        cursor: z.number().nullish(),
        activeAgent: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { limit, cursor, activeAgent } = input;
      const payload = await getPayloadClient();
      const page = cursor || 1;
      const { user } = ctx;

      const {
        docs: items,
        hasNextPage,
        nextPage,
      } = await payload.find({
        collection: "employee",
        where: { activeAgent: { equals: activeAgent } },
        depth: 2,
        limit,
        page,
      });
      console.log("EMPLOYEE FOUND", items);

      return {
        items,
        nextPage: hasNextPage ? nextPage : null,
      };
    }),
  getAllEmployees: privateProcedureAgent
    .input(
      z.object({
        limit: z.number().min(1).max(100),
        cursor: z.number().nullish(),
      })
    )
    .query(async ({ input }) => {
      const { limit, cursor } = input;
      const payload = await getPayloadClient();
      const page = cursor || 1;

      const {
        docs: items,
        hasNextPage,
        nextPage,
      } = await payload.find({
        collection: "employee",
        depth: 2,
        limit,
        page,
      });
      console.log("ALL EMPLOYEES FOUND", items);

      return {
        items,
        nextPage: hasNextPage ? nextPage : null,
      };
    }),
  getSingleEmployee: privateProcedureAgent
    .input(z.object({ employeeId: z.string() }))
    .query(async ({ input }) => {
      const { employeeId } = input;
      const payload = await getPayloadClient();
      const singleEmployee = await payload.findByID({
        collection: "employee",
        id: employeeId,
      });
      return { success: true, singleEmployee };
    }),
  getPrevEmployees: privateProcedureAgent
    .input(
      z.object({
        limit: z.number().min(1).max(100),
        cursor: z.number().nullish(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { limit, cursor } = input;
      const { user } = ctx;
      const agentId = user.id;
      const payload = await getPayloadClient();
      const page = cursor || 1;

      const {
        docs: items,
        hasNextPage,
        nextPage,
      } = await payload.find({
        collection: "employee",
        where: {
          and: [
            { prevAgents: { in: [agentId] } },
            { activeAgent: { not_equals: agentId } },
          ],
        },
        depth: 2,
        limit,
        page,
      });
      console.log("ALL EMPLOYEES FOUND", items);

      return {
        items,
        nextPage: hasNextPage ? nextPage : null,
      };
    }),
  fireEmployee: privateProcedureAgent
    .input(z.object({ employeeId: z.string() }))
    .mutation(async ({ input }) => {
      const { employeeId } = input;
      const payload = await getPayloadClient();
      await payload.update({
        collection: "employee",
        where: { id: { equals: employeeId } },
        data: {
          status: "free",
          activeAgent: null,
        },
      });
      return { success: true };
    }),
});
