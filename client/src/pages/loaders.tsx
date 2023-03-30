import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { getToken } from "../lib/store";

export async function createPostLoader({}: LoaderFunctionArgs) {
  const token = getToken();
  if (!token) {
    // TODO: redirect to not found page
    return redirect("/secret/login");
  }
  return null;
}

export async function blogIndexLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const searchTitle = url.searchParams.get("title");
  const searchTags = url.searchParams.getAll("tag");
  return { searchTags, searchTitle };
}

export async function renderBlogLoader({ params }: LoaderFunctionArgs) {
  const slug = params.slug;
  return slug;
}
