import express from "express";
import { getPayloadClient } from "./get-payload";
import { nextApp, nextHandler } from "./next-utils";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./trpc";
import { inferAsyncReturnType } from "@trpc/server";
import { initEdgeStore } from "@edgestore/server";
import { createEdgeStoreExpressHandler } from "@edgestore/server/adapters/express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const port = Number(process.env.PORT) || 3000;

export type EdgeStoreRouter = typeof edgeStoreRouter;

// Middlewares for EdgeStore
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());
app.use(bodyParser.json());

// Configure EdgeStore
const es = initEdgeStore.create();
const edgeStoreRouter = es.router({
  myPublicFiles: es.fileBucket({ maxSize: 1024 * 1024 * 1 }),
});
const edgeStoreHandler = createEdgeStoreExpressHandler({
  router: edgeStoreRouter,
});

// Middlewares
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.json());

// tRPC context creation
const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({ req, res });
export type ExpressContext = inferAsyncReturnType<typeof createContext>;

const start = async () => {
  const payload = await getPayloadClient({
    initOptions: {
      express: app,
      onInit: async (cms) => {
        cms.logger.info(`Admin url: ${cms.getAdminURL()}`);
      },
    },
  });

  // tRPC API route
  app.use(
    "/api/trpc",
    trpcExpress.createExpressMiddleware({ router: appRouter, createContext })
  );

  // EdgeStore routes
  app.get("/edgestore/*", edgeStoreHandler);
  app.post("/edgestore/*", edgeStoreHandler);

  // Next.js handler
  app.use((req, res) => nextHandler(req, res));
  nextApp.prepare().then(() => {
    payload.logger.info("NEXT JS IS STARTED");
  });

  app.listen(port, async () => {
    payload.logger.info(
      `NEXT.JS APP URL: ${process.env.NEXT_PUBLIC_SERVER_URL}`
    );
    console.log(`Server is running on http://localhost:${port}`);
  });
};

start();
