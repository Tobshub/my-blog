import { inferAsyncReturnType, initTRPC, TRPCError } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";

// created for each request
export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({
  auth: { token: req.headers.authorization },
});
type Context = inferAsyncReturnType<typeof createContext>;

// init trpc
const trpc = initTRPC.context<Context>().create();

export const tRouter = trpc.router;
export const tProcedure = trpc.procedure;
export const tError = TRPCError;
