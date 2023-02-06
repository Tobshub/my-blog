import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import PageNavBar from "../../components/ui/navbar";
import Page from "../../layouts/Page";
import trpc from "../../utils/trpc";

export async function loader({ params }: LoaderFunctionArgs) {
  const slug = params.slug;
  return slug;
}

export default function RenderBlog() {
  const slug = useLoaderData() as string;
  // get blog from the server

  /* TODO: error handling
    if the server returns 504 show "something went wrong page"
    if the server returns 404 show "not found page"
  */
  const {
    data: blog,
    isLoading,
    error,
    isError,
  } = trpc.posts.getPost.useQuery({ slug });

  if (isLoading && !isError) {
    return <>Loading...</>;
  } else if (!blog) {
    throw new Error("this blog post does not exist... yet");
  } else if (error) {
    throw new Error(error.message);
  }

  return (
    <Page
      mainStyles={{
        display: "block",
        textAlign: "left",
        maxWidth: "750px",
        margin: "0 auto",
      }}
    >
      <style>{`
          p {
            display: block
          }
        `}</style>
      <h1>{blog.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: blog.body }} />
    </Page>
  );
}
