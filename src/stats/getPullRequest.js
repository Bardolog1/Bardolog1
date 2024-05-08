import OctokitTool from "../Octokit/OctokitTool.js";
const octokit = OctokitTool();

export async function getPullRequests(repo) {
    const pullRequests = await octokit.pulls.list({
      owner: "bardolog1",
      repo: repo.name,
    });
  
    return pullRequests.data.length;
}
  