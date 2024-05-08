import OctokitTool from "../Octokit/OctokitTool.js";

const octokit = OctokitTool();

export async function getCommitsLengthByRepo(
  repo,
  owner,
  page = 1,
  per_page = 100
) {
  let allCommits = [];

  while (true) {
    try {
      const commitsResponse = await octokit.repos.listCommits({
        owner,
        repo,
        per_page,
        page,
      });

      if (!commitsResponse) break;

      const commits = commitsResponse.data;

      if (commits.length === 0) break;

      allCommits = allCommits.concat(commits);

      if (commits.length < perPage) break;

      page++;
    } catch (error) {
      console.error(
        `Error obteniendo commits para el repositorio ${repo.name}:`,
        error.message
      );
      break;
    }
  }

  return allCommits.length;
}
