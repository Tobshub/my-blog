import * as trpcExpress from "@trpc/server/adapters/express";
import mergeRouters from "./api/merge";
import { createContext } from "./config/trpc";

const appRouter = trpcExpress.createExpressMiddleware({
  router: mergeRouters,
  createContext,
});

export default appRouter;
