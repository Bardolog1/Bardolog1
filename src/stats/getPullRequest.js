import OctokitTool from "../Octokit/OctokitTool.js";
const octokit = OctokitTool();

export async function getPullRequests(repo, owner) {
  let page = 1;
  const perPage = 100;
  let totalPullRequests = 0;

  while (true) {
    const pullRequests = await octokit.pulls.list({
      owner,
      repo,
      state: "all",
      per_page: perPage,
      page,
    });

    totalPullRequests += pullRequests.data.length;

    if (pullRequests.data.length < perPage) {
      break;
    }

    page++;
  }

  return totalPullRequests;
}
