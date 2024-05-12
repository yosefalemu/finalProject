import { authRouter } from "./authRouter";
import { router } from "./trpc";
import { applicationRouter } from "./applicationRouter";
import { screenerRouter } from "./screenerRouter";
import { ordinaryNotificationRouter } from "./ordinaryNotification";

export const appRouter = router({
  auth: authRouter,
  application: applicationRouter,
  screener: screenerRouter,
  ordinaryNotification: ordinaryNotificationRouter,
});

export type AppRouter = typeof appRouter;
