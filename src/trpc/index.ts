import { authRouter } from "./authRouter";
import { router } from "./trpc";
import { applicationRouter } from "./applicationRouter";
import { screenerRouter } from "./screenerRouter";
import { ordinaryNotificationRouter } from "./ordinaryNotification";
import { managerRouter } from "./managerRouter";
import { agentRouter } from "./agent";
import { employeeRoute } from "./employee";

export const appRouter = router({
  auth: authRouter,
  application: applicationRouter,
  screener: screenerRouter,
  ordinaryNotification: ordinaryNotificationRouter,
  manager: managerRouter,
  agent: agentRouter,
  employee: employeeRoute,
});

export type AppRouter = typeof appRouter;
