import { QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { queryClient, trpcClient } from "./lib/query";
import {
  blogIndexLoader,
  createPostLoader,
  renderBlogLoader,
} from "./pages/loaders";
import trpc from "./utils/trpc";
import { lazy } from "react";
import BlogPage from "./pages/blog";
import ProjectsPage from "./pages/projects";
import RenderBlog from "./pages/blog/render";
import HomePage from "./pages/home";
const RenderBlogErrorElement = lazy(() => import("./pages/blog/errors/render-error"));
const CreatePost = lazy(() => import("./pages/blog/create"));
const LoginPage = lazy(() => import("./pages/auth/login"));

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
        loader: blogIndexLoader,
        element: <BlogPage />,
      },
      {
        path: ":slug",
        loader: renderBlogLoader,
        element: <RenderBlog />,
        errorElement: <RenderBlogErrorElement />,
      },
    ],
  },
  {
    path: "/post/create",
    element: <CreatePost />,
    loader: createPostLoader,
  },
  {
    path: "/secret/login",
    element: <LoginPage />,
  },
  {
    path: "/projects",
    element: <ProjectsPage />,
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
