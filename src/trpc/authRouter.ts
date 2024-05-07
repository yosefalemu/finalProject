import { RegistorAsAgentValidators } from "../validators/registor-as-agent";
import { publicProcedure, router } from "./trpc";
import { getPayloadClient } from "../get-payload";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { SignInCredentialValidator } from "../validators/sigin-validators";

export const authRouter = router({
  createOrdinaryUser: publicProcedure
    .input(RegistorAsAgentValidators)
    .mutation(async ({ input }) => {
      const {
        firstName,
        middleName,
        lastName,
        email,
        password,
        nationalId,
        phoneNumber,
        city,
        woreda,
        kebele,
      } = input;
      const payload = await getPayloadClient();
      const { docs: ordinaryUser } = await payload.find({
        collection: "ordinaryUser",
        where: {
          or: [
            {
              email: {
                equals: email,
              },
            },
            {
              nationalId: {
                equals: nationalId,
              },
            },
            {
              phoneNumber: {
                equals: phoneNumber,
              },
            },
          ],
        },
      });
      if (ordinaryUser.length !== 0) {
        const emailTaken = ordinaryUser.find(
          (ordinaryUser) => ordinaryUser.email === email
        );
        const nationalIdTaken = ordinaryUser.find(
          (ordinaryUser) => ordinaryUser.nationalId === nationalId
        );
        const phoneNumberTaken = ordinaryUser.find(
          (ordinaryUser) => ordinaryUser.phoneNumber === phoneNumber
        );

        if (emailTaken) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "Email is taken",
          });
        } else if (nationalIdTaken) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "National id is taken",
          });
        } else if (phoneNumberTaken) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "Phone number is taken",
          });
        } else {
        }
      }
      await payload.create({
        collection: "ordinaryUser",
        data: {
          firstName,
          middleName,
          lastName,
          email,
          password,
          nationalId,
          nationalIdVerified: "pending",
          phoneNumber,
          city,
          woreda,
          kebele,
        },
      });
      return { success: true, sentToEmail: email, nationalId: nationalId };
    }),
  verifyEmail: publicProcedure
    .input(z.object({ token: z.string() }))
    .query(async ({ input }) => {
      const { token } = input;
      const payload = await getPayloadClient();
      const isVerified = await payload.verifyEmail({
        collection: "ordinaryUser",
        token,
      });
      if (!isVerified) throw new TRPCError({ code: "UNAUTHORIZED" });

      return { success: true };
    }),
  signInOrdinaryUser: publicProcedure
    .input(SignInCredentialValidator)
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;
      const { res } = ctx;
      const payload = await getPayloadClient();
      const { docs: registerUser } = await payload.find({
        collection: "ordinaryUser",
        where: {
          email: {
            equals: email,
          },
        },
      });
      if (registerUser?.length === 0) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid email",
        });
      }
      if (!(registerUser[0].nationalIdVerified === "approved")) {
        const userData = {
          firstName: registerUser[0].firstName,
          middleName: registerUser[0].middleName,
          lastName: registerUser[0].lastName,
          nationalId: registerUser[0].nationalId,
        };
        throw new TRPCError({
          code: "CONFLICT",
          message: "National is not verified",
          cause: { userData },
        });
      }

      const logedInUser = await payload.login({
        collection: "ordinaryUser",
        data: {
          email,
          password,
        },
        res,
      });
      if (!logedInUser) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Incorrect password",
        });
      }

      return { success: true, loggedInUserId: logedInUser.user.id };
    }),
  signInUser: publicProcedure
    .input(SignInCredentialValidator)
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;
      const { res } = ctx;
      const payload = await getPayloadClient();
      const { docs: registerUser } = await payload.find({
        collection: "users",
        where: {
          email: {
            equals: email,
          },
        },
      });
      if (registerUser?.length === 0) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid email",
        });
      }
      try {
        await payload.login({
          collection: "users",
          data: {
            email,
            password,
          },
          res,
        });
      } catch (error) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Incorrect password",
        });
      }
      return { success: true };
    }),
});
