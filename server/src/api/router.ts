import { tRouter } from "../config/trpc";
import authRouter from "./auth/auth-router";
import postRouter from "./posts/post-router";
import projectRouter from "./projects/project-router";

const mergeRouters = tRouter({
  posts: postRouter,
  auth: authRouter,
});

export default mergeRouters;

export type AppRouter = typeof mergeRouters;
