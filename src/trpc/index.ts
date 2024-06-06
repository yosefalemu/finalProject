import { authRouter } from "./authRouter";
import { router } from "./trpc";
import { applicationRouter } from "./applicationRouter";
import { screenerRouter } from "./screenerRouter";
import { ordinaryNotificationRouter } from "./ordinaryNotification";
import { managerRouter } from "./managerRouter";
import { agentRouter } from "./agent";
import { employeeRoute } from "./employee";
import { conversationRoute } from "./mainConversation";
import { messageRoute } from "./mainMessage";

export const appRouter = router({
  auth: authRouter,
  application: applicationRouter,
  screener: screenerRouter,
  ordinaryNotification: ordinaryNotificationRouter,
  manager: managerRouter,
  agent: agentRouter,
  employee: employeeRoute,
  conversation: conversationRoute,
  message: messageRoute,
});

export type AppRouter = typeof appRouter;
