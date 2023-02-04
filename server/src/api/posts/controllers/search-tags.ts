import { usePrisma } from "../../../config/prisma";

export async function searchTags(tags: string[]) {
  try {
    const filteredPosts = await usePrisma.post.findMany({
      where: {
        tags: {
          hasSome: tags,
        },
      },
    });

    return filteredPosts;
  } catch (error) {
    console.error(error);
    return "internal server error";
  }
}
