import { usePrisma } from "../../../config/prisma";
import slugify from "slugify";

// create a new post
export async function newPost(post: {
  title: string;
  description: string;
  tags: string[];
  body: string;
}) {
  try {
    const slug = slugify(post.title, { lower: true });
    await usePrisma.post.create({
      data: { ...post, slug, createdAt: new Date(Date.now()) },
    });
    return { slug };
  } catch (error) {
    console.error(error);
    return "internal server error";
  }
}
