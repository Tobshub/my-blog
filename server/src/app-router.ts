import * as trpcExpress from "@trpc/server/adapters/express";
import mergeRouters from "./api/router";
import { createContext } from "./config/trpc";

const appRouter = trpcExpress.createExpressMiddleware({
  router: mergeRouters,
  createContext,
});

export default appRouter;
