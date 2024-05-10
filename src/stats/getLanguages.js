import OctokitTool from "../Octokit/OctokitTool.js";

const octokit = OctokitTool();

const endpoint = "GET /repos/{owner}/{repo}/languages";

export async function getLanguages(repo, owner) {
  const response = await octokit.request(endpoint, {
    owner,
    repo,
  });
  return response.data;
}
