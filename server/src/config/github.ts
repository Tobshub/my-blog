import { Octokit } from "@octokit/core";
import { env } from "..";

const octokit = new Octokit({ auth: env.github });

export default octokit;
