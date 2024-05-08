import OctokitTool from "../Octokit/OctokitTool";

const octokit = OctokitTool();


export async function getRepos(page , perPage = 100) {
 
    return await octokit.repos.listForAuthenticatedUser({
      visibility: "all",
      affiliation: "owner",
      per_page: perPage,
      page: page,
    });
  
  
}