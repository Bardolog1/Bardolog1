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
  let allCommits = [];
  let page = 1;
  const perPage = 100;

  // Recorre todas las páginas de commits
  while (true) {
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
  }

  const ownerCommits = allCommits.filter((commit) => commit.author && commit.author.login === "bardolog1");

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
