import { tRouter, tProcedure, tError } from "../../config/trpc";
import z from "zod";
import getRecent from "./controllers/get-recent";
import newPost from "./controllers/new-post";
import getPost from "./controllers/get-post";

const postRouter = tRouter({
  // get Routes
  searchByTitle: tProcedure
    .input(z.object({ title: z.string() }))
    .query(({ input }) => {
      return `post: ${input.title}`;
    }),
  searchByTags: tProcedure
    .input(z.object({ tags: z.string().array() }))
    .query(({ input }) => {
      return `post tags: ${input.tags.toString()}`;
    }),
  getPost: tProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const post = await getPost(input.slug);
      switch (typeof post) {
        case "string": {
          if (post === "not_found") {
            throw new tError({ message: "invalid slug", code: "NOT_FOUND" });
          } else if (post === "internal server error") {
            throw new tError({
              message: "An error occured",
              code: "INTERNAL_SERVER_ERROR",
            });
          }
        }
        case "object": {
          if (post) {
            return post;
          }
        }
      }
      return;
    }),
  getRecentPosts: tProcedure
    .input(z.object({ max: z.number().default(20) }))
    .query(async ({ input }) => {
      const recenentPosts = await getRecent(input.max);
      if (recenentPosts === "internal server error") {
        throw new tError({
          message: "An error occured",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
      return recenentPosts;
    }),
  // post routes
  newPost: tProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        body: z.string(),
        tags: z.string().array(),
      })
    )
    .mutation(async ({ input }) => {
      const slug = await newPost(input);
      if (slug === "internal server error") {
        throw new tError({
          message: "An error occured",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
      return slug;
    }),
});

export default postRouter;
