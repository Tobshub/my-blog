import "../../assets/styles/projects.scss";
import Page from "../../layouts/Page";
import projects from "./data.js";

export default function ProjectsPage() {
  return (
    <Page mainClassName="d-flex flex-column align-items-center">
      <h1>Projects</h1>
      <section className="projects">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </section>
    </Page>
  );
}

type ProjectData = {
  description: string | null;
  topics: string[];
  url: string;
  language: string;
  name: string;
  imageUrl: string;
};

function ProjectCard({ project }: { project: ProjectData }) {
  return (
    <div className="project-card">
      <a href={project.url} className="project-card-inner">
        <div>
          <h2 title="name">{project.name}</h2>
          <p>Project Language: {project.language}</p>
          <p>{project.description}</p>
          <h3>Topics</h3>
          <p>{project.topics.join(" | ")}</p>
        </div>
        <img src={project.imageUrl} />
      </a>
    </div>
  );
}
