import { Octokit } from "@octokit/rest";
import { promises as fs } from "fs";

const octokit = new Octokit({
  auth: process.env.GH_TOKEN,
});

async function getLanguages(repo) {
  const languages = await octokit.request("GET /repos/{owner}/{repo}/languages", {
    owner: "bardolog1",
    repo: repo.name,
  });

  return languages.data;
}

async function getCommits(repo) {
  const response = await octokit.request("GET /repos/{owner}/{repo}/commits", {
    owner: "bardolog1",
    repo: repo.name,
    per_page: 100, // Especifica el número de commits por página
  });

  // Verifica si hay múltiples páginas
  const linkHeader = response.headers.link;
  if (linkHeader) {
    const lastPageMatch = linkHeader.match(/<([^>]+)>;\s*rel="last"/);
    if (lastPageMatch) {
      const lastPageUrl = lastPageMatch[1];
      const lastPage = parseInt(new URLSearchParams(lastPageUrl).get("page"), 10);

      // Recorre las páginas restantes y suma los commits
      for (let page = 2; page <= lastPage; page++) {
        const nextPageResponse = await octokit.request("GET /repos/{owner}/{repo}/commits", {
          owner: "bardolog1",
          repo: repo.name,
          per_page: 100,
          page,
        });
        response.data = response.data.concat(nextPageResponse.data);
      }
    }
  }

  // Filtra los commits para incluir solo aquellos cuyo autor es el propietario del repositorio
  const ownerCommits = response.data.filter(commit => commit.author && commit.author.login === "bardolog1");

  return ownerCommits.length;
}

async function getPullRequests(repo) {
  const pullRequests = await octokit.pulls.list({
    owner: "bardolog1",
    repo: repo.name,
  });

  return pullRequests.data.length;
}

async function getStargazers(repo) {
  const stargazers = await octokit.activity.listStargazersForRepo({
    owner: "bardolog1",
    repo: repo.name,
  });

  return stargazers.data.length;
}

async function getUser() {
  return octokit.users.getAuthenticated();
}

async function getRepos() {
  return octokit.repos.listForAuthenticatedUser();
}

async function calculateLangPercents(lang) {
  const langPercents = lang.map((l) => ({
    name: l.name,
    value: ((l.value * 100) / lang.reduce((a, b) => a + b.value, 0)).toFixed(2),
  }));

  langPercents.sort((a, b) => b.value - a.value);
  return langPercents;
}

async function updateReadme(updatedStats) {
  const readmePath = "./README.md";
  const existingReadmeContent = await fs.readFile(readmePath, "utf-8");

  const updatedReadmeContent = `
    # Mi Proyecto
    
    Estadísticas actualizadas:
    
    - Total de repositorios: ${updatedStats.totalPrivateRepos + updatedStats.totalPublicRepos}
    - Total de commits: ${updatedStats.totalCommits}
    - ...
  `;

  await fs.writeFile(readmePath, updatedReadmeContent);
}

async function getStats() {
  try {
    const lang = [];
    let totalCommits = 0;
    let totalPrivateRepos = 0;
    let totalPublicRepos = 0;
    let totalPullRequests = 0;
    let totalStars  = 0;

    const user = await getUser();
    const repos = await getRepos();

    for (const repo of repos.data) {
      const repoLanguages = await getLanguages(repo);
      for (const language in repoLanguages) {
        if (lang.find((l) => l.name === language)) {
          lang.find((l) => l.name === language).value += repoLanguages[language];
        } else {
          lang.push({ name: language, value: repoLanguages[language] });
        }
      }

      totalCommits += await getCommits(repo);
      console.log(repo.name," acumulado commits", totalCommits);
      totalPullRequests += await getPullRequests(repo);
      totalStars += await getStargazers(repo);
      console.log(repo.name," acumulado stars", totalStars);

    }

    const langPercents = await calculateLangPercents(lang);

    totalPrivateRepos = user.data.total_private_repos;
    totalPublicRepos = user.data.public_repos;

    const updatedStats = {
      langPercents,
      totalCommits,
      totalPullRequests,
      totalStars,
      totalPrivateRepos,
      totalPublicRepos,
    };

    await updateReadme(updatedStats);
  } catch (error) {
    console.error("Error:", error);
  }
}



async function run() {
  await getStats();
}

run();
