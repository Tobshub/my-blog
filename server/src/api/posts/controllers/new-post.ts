import { usePrisma } from "../../../config/prisma";

// create a new post
export default async function (post: {
  title: string;
  description: string;
  tags: string[];
  body: string;
}) {
  try {
    const slug = genSlug(post.title);
    await usePrisma.post.create({
      data: { ...post, slug, createdAt: new Date(Date.now()) },
    });
    return { slug };
  } catch (error) {
    console.error(error);
    return "internal server error";
  }
}

function genSlug(str: string) {
  const slug = Math.random().toString(36).substring(2);
  return slug;
}
