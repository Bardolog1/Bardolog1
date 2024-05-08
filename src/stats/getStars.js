import OctokitTool from "../Octokit/OctokitTool.js";

const octokit = OctokitTool();

export async function getStars(repo, owner) {
    const stargazers = await octokit.activity.listStargazersForRepo({
      owner,
      repo,
    });
      if (stargazers) {
      return stargazers.data.length;
    } else {
      return 0;  
    } 
  }