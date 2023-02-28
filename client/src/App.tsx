import { QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { queryClient, trpcClient } from "./lib/query";
import LoginPage from "./pages/auth/login";
import BlogPage, { loader as blogIndexLoader } from "./pages/blog";
import CreatePost, { loader as createPostLoader } from "./pages/blog/create";
import RenderBlogErrorElement from "./pages/blog/errors/render-error";
import RenderBlog, { loader as renderBlogLoader } from "./pages/blog/render";
import HomePage from "./pages/home";
import trpc from "./utils/trpc";
import ProjectsPage from "./pages/projects";

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
