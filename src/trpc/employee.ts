import { Agent, OrdinaryUser } from "@/payload-types";
import { getPayloadClient } from "../get-payload";
import { AddEmployee } from "../validators/add-employee";
import { privateProcedureAgent, router } from "./trpc";
import { TRPCError } from "@trpc/server";

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
});
