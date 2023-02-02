import { QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { queryClient, trpcClient } from "./lib/query";
import BlogIndex from "./pages/blog";
import RenderBlog, { loader as renderBlogLoader } from "./pages/blog/render";
import HomePage from "./pages/home";
import trpc from "./utils/trpc";

const clientRouter = createBrowserRouter([
  {
    index: true,
    element: <HomePage />,
  },
  {
    path: "/blog",
    element: <Outlet />,
    children: [
      {
        index: true,
        element: <BlogIndex />,
      },
      {
        path: ":slug",
        loader: renderBlogLoader,
        element: <RenderBlog />,
      },
    ],
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

