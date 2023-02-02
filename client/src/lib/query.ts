import { QueryClient } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/react-query";
import trpc from "../utils/trpc";
import env from "../data/env.json";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000 /** 1 minute */,
    },
  },
});

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: `${env.SERVER_URL}/api`,
    }),
  ],
});
