import { usePrisma } from "../../../config/prisma";

// get recent posts
export async function getRecent(limit: number) {
  try {
    const recentPosts = await usePrisma.post.findMany({
      take: limit,
      orderBy: { createdAt: "desc" },
      select: {
        createdAt: true,
        slug: true,
        title: true,
        tags: true,
        description: true,
      },
    });
    return recentPosts;
  } catch (error) {
    console.error(error);
    return "internal server error";
  }
}
