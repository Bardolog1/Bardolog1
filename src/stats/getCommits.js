import OctokitTool from "../Octokit/OctokitTool.js";

const octokit = OctokitTool();

export async function getCommitsLengthByRepo(
  repo,
  owner,
  page = 1,
  per_page = 100
) {
  console.log("Obteniendo commits para el repositorio:", repo);
  let commitCount = 0; 

  while (true) {
    try {
      const commitsResponse = await octokit.repos.listCommits({
        owner,
        repo,
        per_page,
        page,
      });

      const commits = commitsResponse.data;

      if (commits.length === 0) break;

      commits.forEach((commit) => {
      
        if (commit.author && commit.author.login && commit.author.login.toLowerCase() === owner.toLowerCase()) {
          commitCount++; 
        }
      });

      if (commits.length < per_page) break;

      page++;
    } catch (error) {
      console.error(
        `Error obteniendo commits para el repositorio ${repo}:`,
        error.message
      );
      break;
    }
  }
  console.log("==========================================================================================================");
  console.log("Total de commits para el repositorio: ",repo , " N° : ", commitCount);
  console.log("==========================================================================================================");
  
  return commitCount; 
}
