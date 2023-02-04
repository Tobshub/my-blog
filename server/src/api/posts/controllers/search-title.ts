import { usePrisma } from "../../../config/prisma";

// filter posts by their title
export async function searchTitle(title: string) {
  try {
    const filteredPosts = await usePrisma.post.findMany({
      where: {
        title: {
          contains: title,
        },
      },
      select: {
        createdAt: true,
        slug: true,
        title: true,
        tags: true,
        description: true,
      },
    });

    return filteredPosts;
  } catch (error) {
    console.error(error);
    return "internal server error";
  }
}
