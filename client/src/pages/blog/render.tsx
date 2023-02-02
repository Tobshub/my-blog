import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import PageNavBar from "../../components/ui/navbar";
import trpc from "../../utils/trpc";

export async function loader({ params }: LoaderFunctionArgs) {
  const slug = params.slug;
  return slug;
}

export default function RenderBlog() {
  const slug = useLoaderData() as string;
  // get blog from the server

  const { data: blog } = trpc.posts.getPost.useQuery(
    { slug },
    {
      onSuccess(data) {
        console.log(data);
      },
    }
  );

  return (
    <div className="page">
      <PageNavBar />
      <main style={{ display: "block", textAlign: "left" }}>
        <h1>{blog?.title}</h1>
        <p>{blog?.body}</p>
      </main>
    </div>
  );
}
