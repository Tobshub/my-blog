import { Octokit } from "@octokit/core";

const octokit = (github_secret: string) => new Octokit({ auth: github_secret });

export default octokit;
