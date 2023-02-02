import PageNavBar from "../../components/ui/navbar";
import BackgroundSVG from "../../assets/images/background.svg";
import trpc from "../../utils/trpc";
import { Link } from "react-router-dom";

export default function BlogIndex() {
  const blogs = trpc.posts.getRecentPosts.useQuery(
    { max: 20 },
    {
      onSuccess(data) {
        console.log(data);
      },
    }
  );
  return (
    <div className="page" style={{ backgroundImage: `url(${BackgroundSVG})` }}>
      <PageNavBar />
      <main
        className={`d-flex flex-column`}
        style={{ gap: "4rem", padding: "0 4rem" }}
      >
        {blogs.data?.map((post) => (
          <div key={post.slug} style={{ textAlign: "left", display: "block" }}>
            <h2>
              <Link to={`./${post.slug}`}>{post.title}</Link>
            </h2>
            <p>{post.description}</p>
            <p>{post.tags.join(" | ")}</p>
          </div>
        ))}
      </main>
    </div>
  );
}
