import Page from "../../layouts/Page";
import trpc from "../../utils/trpc";

export default function ProjectsPage() {
  const projects = trpc.projects.list.useQuery();

  return (
    <Page>
      <h1>Projects</h1>

      {projects.isLoading ? (
        <p>Loading...</p>
      ) : projects.data ? (
        projects.data.map((project) => <>{project.name}</>)
      ) : (
        <>:p</>
      )}
    </Page>
  );
}
