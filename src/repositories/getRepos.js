import OctokitTool from "../Octokit/OctokitTool.js";

const octokit = OctokitTool();

export async function getRepos(
  page = 1,
  per_page = 100,
  affiliation = "owner",
  visibility = "all"
) {
  return await octokit.repos.listForAuthenticatedUser({
    visibility,
    affiliation,
    per_page,
    page,
  });
}
