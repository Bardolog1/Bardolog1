import OctokitTool from "../Octokit/OctokitTool.js";
const octokit = OctokitTool();

export async function getPullRequests(repo, owner) {
  const pullRequests = await octokit.pulls.list({
    owner,
    repo,
  });

  return pullRequests.data.length;
}
