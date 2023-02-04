import { usePrisma } from "../../../config/prisma";

// get a post with the slug
export async function getPost(slug: string) {
  try {
    const post = await usePrisma.post.findUnique({
      where: { slug },
      select: {
        body: true,
        title: true,
        tags: true,
      },
    });
    if (!post) {
      return "not_found";
    }
    return post;
  } catch (error) {
    console.error(error);
    return "internal server error";
  }
}
