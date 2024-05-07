import { authRouter } from "./authRouter";
import { router } from "./trpc";
import { applicationRouter } from "./applicationRouter";
import { screenerRouter } from "./screenerRouter";

export const appRouter = router({
  auth: authRouter,
  application: applicationRouter,
  screener: screenerRouter,
});

export type AppRouter = typeof appRouter;
