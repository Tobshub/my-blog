import { tRouter, tProcedure, tError } from "../../config/trpc";
import z from "zod";
import { validateToken } from "../auth/controllers/token";
import {
  getPost,
  getRecent,
  newPost,
  searchTags,
  searchTitle,
} from "./controllers";

// TODO: merge search by title and tags
// so users can do both for better filtering
const postRouter = tRouter({
  // get Routes
  searchByTitle: tProcedure
    .input(z.object({ title: z.string() }))
    .query(async ({ input }) => {
      const posts = await searchTitle(input.title);
      switch (typeof posts) {
        case "string": {
          throw new tError({
            message: "An error occured",
            code: "INTERNAL_SERVER_ERROR",
          });
        }
        case "object": {
          return posts;
        }
      }
    }),
  searchByTags: tProcedure
    .input(z.object({ tags: z.string().array() }))
    .query(async ({ input }) => {
      const posts = await searchTags(input.tags);
      if (posts === "internal server error") {
        throw new tError({
          message: "An error occured",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
      return posts;
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
    .mutation(async ({ input, ctx }) => {
      if (!ctx.auth.token) {
        throw new tError({ message: "token is missing", code: "UNAUTHORIZED" });
      }
      const validate = await validateToken(ctx.auth.token);

      switch (validate) {
        case "invalid token":
        case "expired":
        case "error validating token": {
          throw new tError({
            message: "you aren't Tobs",
            code: "UNAUTHORIZED",
          });
        }
        default: {
          // when the token is validated
          const slug = await newPost(input);
          if (slug === "internal server error") {
            throw new tError({
              message: "An error occured",
              code: "INTERNAL_SERVER_ERROR",
            });
          }
          return slug;
        }
      }
    }),
});

export default postRouter;
