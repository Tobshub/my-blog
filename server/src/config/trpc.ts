import { initTRPC, TRPCError } from "@trpc/server";

// init trpc
const trpc = initTRPC.create();

export const tRouter = trpc.router;
export const tProcdedure = trpc.procedure;
export const tError = TRPCError;
