import OctokitTool from "../Octokit/OctokitTool.js";

const octokit = OctokitTool();

const endpoint = "GET /repos/{owner}/{repo}/languages";

export async function getLanguages(repo, owner) {
  return await octokit.request(endpoint, {
    owner,
    repo,
  });
}
