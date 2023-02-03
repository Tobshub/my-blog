import PageNavBar from "../../components/ui/navbar";
import BackgroundSVG from "../../assets/images/background.svg";
import trpc from "../../utils/trpc";
import { Link } from "react-router-dom";

export default function BlogIndex() {
  const blogs = trpc.posts.getRecentPosts.useQuery(
    { max: 20 },
    {
      // onSuccess(data) {
      //   console.log(data);
      // },
    }
  );
  return (
    <div className="page">
      <PageNavBar />
      <main
        className={`d-flex flex-column`}
        style={{ gap: "4rem", padding: "0 4rem" }}
      >
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
              <p>{post.tags.join(" | ")}</p>
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
