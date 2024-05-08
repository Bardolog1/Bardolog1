import OctokitTool from "../Octokit/OctokitTool.js";

const octokit = OctokitTool();

export async function getCommits(repo) {
  let allCommits = [];
  let page = 1;
  const perPage = 100;

  while (true) {
    try {
      const commitsResponse = await octokit.repos.listCommits({
        owner: "bardolog1",
        repo: repo.name,
        per_page: perPage,
        page: page,
      });

      const commits = commitsResponse.data;

      if (commits.length === 0) {
        break;
      }

      allCommits = allCommits.concat(commits);

      if (commits.length < perPage) {
        break;
      }
      page++;
    } catch (error) {
      console.error(
        `Error obteniendo commits para el repositorio ${repo.name}:`,
        error.message
      );
      break;
    }
  }
  const ownerCommits = allCommits;
  return ownerCommits.length;
}
