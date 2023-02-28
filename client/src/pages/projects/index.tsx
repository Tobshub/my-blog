import "../../assets/styles/projects.scss";
import Page from "../../layouts/Page";
import trpc from "../../utils/trpc";

export default function ProjectsPage() {
  const projects = trpc.projects.list.useQuery(undefined, {
    onSuccess: (data) => console.log(data),
  });

  if (projects.error) {
    throw new Error(projects.error.message);
  }

  return (
    <Page>
      <h1>Projects</h1>
      <section className="projects">
        {projects.isLoading ? (
          <p>Loading...</p>
        ) : projects.data ? (
          projects.data.map((project) => <ProjectCard key={project.id} project={project} />)
        ) : (
          <>:p</>
        )}
      </section>
    </Page>
  );
}

type ProjectData = {
  created_at: string;
  description: string | null;
  topics: string[];
  url: string;
  id: string;
  language: string;
  name: string;
  owner: {
    avatar_url: string;
    url: string;
  };
  stargazers_count: number;
  updated_at: string;
};

function ProjectCard({ project }: { project: ProjectData }) {
  return (
    <div className="project-card">
      <a href={project.url}>
        <p>{new Date(project.created_at).toLocaleDateString("en-GB")}</p>
        <div className="heading">
          <img src={project.owner.avatar_url} width={50} />
          <h2>{project.name}</h2>
        </div>
        <p>{project.language}</p>
        <p>{project.description}</p>
        <p>{project.topics.join(" | ")}</p>
      </a>
    </div>
  );
}
