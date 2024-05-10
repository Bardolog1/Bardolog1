import OctokitTool from "../Octokit/OctokitTool.js";

const octokit = OctokitTool();

 let allCommits = [];
 let commitAtRepo = 0;
export async function getCommitsLengthByRepo(
  repo,
  owner,
  page = 1,
  per_page = 100
) {
  console.log("Obteniendo commits para el repositorio:", repo);

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
        if(commit.author.login ===null){
          console.log("Repositorio: ", repo);
          console.log("Commit Autor nulo: ", commit);
        }
      
        if (commit.author.login.toLowerCase() === owner.toLowerCase()) {
          allCommits.push(commit);
          commitAtRepo++;
        }else{
          console.log("Autor no coincide:", commit.author.login);
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
  console.log("Total de commits:", allCommits.length);
  console.log("Total de commits para el repositorio:", commitAtRepo);
  return allCommits.length;
}
