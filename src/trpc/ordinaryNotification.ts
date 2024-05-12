import { getPayloadClient } from "../get-payload";
import { privateProcedure, router } from "./trpc";
import { z } from "zod";

export const ordinaryNotificationRouter = router({
  getUserNotifications: privateProcedure.query(async ({ ctx }) => {
    const { user } = ctx;
    const reciever = user.id;
    const payload = await getPayloadClient();
    const { docs: notificationFounds } = await payload.find({
      collection: "ordinaryNotification",
      where: {
        reciever: { equals: reciever },
      },
    });
    if (notificationFounds.length === 0) {
      return { unseen: 0, notification: [] };
    } else {
      const isViewed = notificationFounds.filter(
        (item) => item.isViewed === "unseen"
      );
      return { unseen: isViewed.length, notification: notificationFounds };
    }
  }),
  updateView: privateProcedure
    .input(z.object({ notificationId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const payload = await getPayloadClient();
      const { user } = ctx;
      const { notificationId } = input;
      console.log("APPLICATIONID", notificationId);
      await payload.update({
        collection: "ordinaryNotification",
        where: {
          and: [
            { id: { equals: notificationId } },
            { reciever: { equals: user.id } },
          ],
        },
        data: { isViewed: "seen" },
      });
    }),
});
