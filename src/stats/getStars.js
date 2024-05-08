import OctokitTool from "../Octokit/OctokitTool";

const octokit = OctokitTool();

export async function getStars(repo) {
    const stargazers = await octokit.activity.listStargazersForRepo({
      owner: "bardolog1",
      repo: repo.name,
    });
      if (stargazers) {
      return stargazers.data.length;
    } else {
      return 0;  
    } 
  }