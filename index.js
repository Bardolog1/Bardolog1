import { Octokit } from "@octokit/rest";
import { promises as fs } from "fs";

const octokit = new Octokit({
  auth: process.env.GH_TOKEN,
});

async function getStats() {
  try {
    const lang = [];
    let totalCommits = 0;
    let totalPullRequests = 0; 
    let totalStars = 0;
    const langPercents = [];

    const user = await octokit.users.getAuthenticated();
    const repos = await octokit.repos.listForAuthenticatedUser();

    for (const repo of repos.data) {
      const repoLanguages = await octokit.request("GET /repos/{owner}/{repo}/languages", {
        owner: "bardolog1",
        repo: repo.name,
      });

      for (const language in repoLanguages.data) {
        if (lang.find((l) => l.name === language)) {
          lang.find((l) => l.name === language).value += repoLanguages.data[language];
        } else {
          lang.push({ name: language, value: repoLanguages.data[language] });
        }
      }

      totalCommits += (await octokit.request("GET /repos/{owner}/{repo}/commits", {
        owner: "bardolog1",
        repo: repo.name,
      })).data.length;

      totalPullRequests += (await octokit.pulls.list({
        owner: "bardolog1",
        repo: repo.name,
      })).data.length;

      totalStars += (await octokit.activity.listStargazersForRepo({
        owner: "bardolog1",
        repo: repo.name,
      })).data.length;
    }

    lang.forEach((l) => {
      langPercents.push({
        name: l.name,
        value: ((l.value * 100) / lang.reduce((a, b) => a + b.value, 0)).toFixed(2),
      });
    });

    langPercents.sort((a, b) => b.value - a.value);

    const totalPrivateRepos = user.data.total_private_repos;
    const totalPublicRepos = user.data.public_repos;

    const readmePath = "./README.md";
    const existingReadmeContent = await fs.readFile(readmePath, "utf-8");

    const updatedReadmeContent = `
      # Mi Proyecto
      
      Estadísticas actualizadas:
      
      - Total de repositorios: ${totalPrivateRepos + totalPublicRepos}
      - Total de commits: ${totalCommits}
      - Total de pull requests: ${totalPullRequests}
      - Total de estrellas: ${totalStars}
    `;

    await fs.writeFile(readmePath, updatedReadmeContent);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function run() {
  await getStats();
}

run();