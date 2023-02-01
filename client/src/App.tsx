import { QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { queryClient, trpcClient } from "./lib/query";
import IndexPage from "./pages";
import trpc from "./utils/trpc";

const clientRouter = createBrowserRouter([
  {
    index: true,
    element: <IndexPage />,
  },
]);

export default function App() {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={clientRouter} />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

