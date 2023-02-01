import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "../../../server/src/api/merge";

const trpc = createTRPCReact<AppRouter>({});

export default trpc;
