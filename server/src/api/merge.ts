import { tRouter } from "../config/trpc";
import postRouter from "./posts/post-router";

const mergeRouters = tRouter({
  posts: postRouter,
});

export default mergeRouters;

export type AppRouter = typeof mergeRouters;
