import { authRouter } from "./authRouter";
import { router } from "./trpc";
import { applicationRouter } from "./applicationRouter";
import { screenerRouter } from "./screenerRouter";
import { ordinaryNotificationRouter } from "./ordinaryNotification";
import { managerRouter } from "./managerRouter";

export const appRouter = router({
  auth: authRouter,
  application: applicationRouter,
  screener: screenerRouter,
  ordinaryNotification: ordinaryNotificationRouter,
  manager: managerRouter,
});

export type AppRouter = typeof appRouter;
