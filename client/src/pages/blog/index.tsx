import PageNavBar from "../../components/ui/navbar";
import trpc from "../../utils/trpc";
import "../../assets/styles/blog.scss";
import { Link, LoaderFunctionArgs, useLoaderData } from "react-router-dom";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const searchTitle = url.searchParams.get("title");
  const searchTags = url.searchParams.getAll("tags");
  return { searchTags, searchTitle };
}

export default function BlogIndex() {
  const searchFilter = useLoaderData() as
    | { searchTitle: string | null; searchTags: string[] }
    | undefined;
  // search with filter if it exists
  const blogs = searchFilter?.searchTitle
    ? trpc.posts.searchByTitle.useQuery({ title: searchFilter.searchTitle })
    : searchFilter?.searchTags.length
    ? trpc.posts.searchByTags.useQuery({ tags: searchFilter.searchTags })
    : trpc.posts.getRecentPosts.useQuery({ max: 20 });
  return (
    <div className="page">
      <PageNavBar />
      <main className={`d-flex flex-column`} style={{ gap: "4rem" }}>
        {blogs.data && blogs.data.length ? (
          blogs.data.map((post) => (
            <div
              key={post.slug}
              style={{ textAlign: "left", display: "block" }}
            >
              <h2>
                <Link to={`./${post.slug}`}>{post.title}</Link>
              </h2>
              <p dangerouslySetInnerHTML={{ __html: post.description }} />
              <p>
                {post.tags.map((tag, i) => (
                  <Link to={{ pathname: "/blog", search: `?tag=${tag}` }}>
                    {tag}
                    {i < post.tags.length - 1 ? " | " : ""}
                  </Link>
                ))}
              </p>
            </div>
          ))
        ) : (
          <p className="display-1">
            {blogs.isLoading ? "Loading..." : "Nothing to see here"}
          </p>
        )}
      </main>
    </div>
  );
}
