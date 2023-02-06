import { Link, useRouteError } from "react-router-dom";
import PageNavBar from "../../../components/ui/navbar";
import { Solution } from "./types";

const possibleSolutions: Solution[] = [
  {
    text: "Reload the page",
    action: () => location.reload(),
  },
  {
    text: "Go to the home page",
    link: "/",
  },
];

export default function RenderBlogErrorElement() {
  const error = useRouteError() as Error;

  return (
    <div className="page">
      <PageNavBar />
      <main>
        <h1>An error occured</h1>
        <p>{error.message}</p>
        <ul>
          {possibleSolutions.map((solution) =>
            "link" in solution ? (
              <li>
                <Link to={solution.link}>{solution.text}</Link>
              </li>
            ) : (
              <li>
                <button className="btn btn-link" onClick={solution.action}>
                  {solution.text}
                </button>
              </li>
            )
          )}
        </ul>
      </main>
    </div>
  );
}
