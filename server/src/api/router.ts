import { tRouter } from "../config/trpc";
import authRouter from "./auth/auth-router";
import postRouter from "./posts/post-router";

export const mergeRouters = tRouter({
  posts: postRouter,
  auth: authRouter,
});

export type AppRouter = typeof mergeRouters;
