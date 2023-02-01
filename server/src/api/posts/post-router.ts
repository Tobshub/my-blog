import { tRouter, tProcdedure } from "../../config/trpc";
import z from "zod";

const postRouter = tRouter({
  searchByTitle: tProcdedure
    .input(z.object({ title: z.string() }))
    .query(({ input }) => {
      return `post: ${input.title}`;
    }),
  searchByTags: tProcdedure
    .input(z.object({ tags: z.string().array() }))
    .query(({ input }) => {
      return `post tags: ${input.tags.toString()}`;
    }),
  getPost: tProcdedure
    .input(z.object({ slug: z.string() }))
    .query(({ input }) => {
      return `post: ${input.slug}`;
    }),
});

export default postRouter;
