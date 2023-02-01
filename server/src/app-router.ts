import * as trpcExpress from "@trpc/server/adapters/express";
import mergeRouters from "./api/merge";

const appRouter = trpcExpress.createExpressMiddleware({
  router: mergeRouters,
});

export default appRouter;
