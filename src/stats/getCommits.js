import OctokitTool from "../Octokit/OctokitTool.js";

const octokit = OctokitTool();

 let allCommits = [];
 
export async function getCommitsLengthByRepo(
  repo,
  owner,
  page = 1,
  per_page = 100
) {

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
      console.log("Obteniendo commits para el repositorio:", repo, " El total de commits es: ", commits.length);
      
     
      commits.forEach((commit) => {
        if (commit.author.login.toLowerCase() === owner.toLowerCase()) {
          allCommits.push(commit);
        }
          
      })

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

  return allCommits.length;
}
