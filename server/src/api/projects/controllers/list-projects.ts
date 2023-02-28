import octokit from "../../../config/github";

export default async function listProjects(filterList: string[]) {
  try {
    const res = await octokit.request("GET /user/repos?visibility=public&sort=updated", {
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
        accept: "application/vnd.github+json",
      },
    });

    const data = res.data as GithubRepo[];
    return data.filter(({ name }) => filterList.includes(name));
  } catch (error) {
    console.error(error);
    return "internal server error";
  }
}

type GithubRepo = {
  id: string;
  name: string;
  description: string | null;
  url: string;
  git_tags_url: string;
  created_at: string;
  updated_at: string;
  stargazers_count: number;
  language: string;
};
