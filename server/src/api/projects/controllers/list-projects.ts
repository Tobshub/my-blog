import { env } from "../../..";

type GithubRepo = {
  id: string;
  name: string;
  description: string | null;
  html_url: string;
  topics: string[];
  created_at: string;
  updated_at: string;
  stargazers_count: number;
  language: string;
  owner: { avatar_url: string; html_url: string };
};

export default async function listProjects(filterList: string[]) {
  try {
    const res = await env.github.request("GET /user/repos?visibility=public&sort=updated", {
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
        accept: "application/vnd.github+json",
      },
    });

    const data = res.data as GithubRepo[];
    return data.filter(({ name }) => filterList.includes(name)).map(transformData);
  } catch (error) {
    console.error(error);
    return "internal server error";
  }
}

function transformData(data: GithubRepo) {
  return {
    created_at: data.created_at,
    description: data.description,
    topics: data.topics,
    url: data.html_url,
    id: data.id,
    language: data.language,
    name: data.name,
    owner: { avatar_url: data.owner.avatar_url, url: data.owner.html_url },
    stargazers_count: data.stargazers_count,
    updated_at: data.updated_at,
  };
}
