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
    try {
      const commitsResponse = await octokit.repos.listCommits({
        owner: "bardolog1",
        repo: repo.name,
        per_page: perPage,
        page: page,
      });
      
      console.log(commitsResponse);

      const commits = commitsResponse.data;

      if (commits.length === 0) {
        break; // No hay más commits, sal del bucle
      }

      allCommits = allCommits.concat(commits);

      if (commits.length < perPage) {
        break; // Menos commits de los esperados en esta página, sal del bucle
      }

      page++;
    } catch (error) {
      console.error(`Error obteniendo commits para el repositorio ${repo.name}:`, error.message);
      break;
    }
  }

  // Filtra los commits para incluir solo aquellos cuyo autor es el propietario del repositorio
  //const ownerCommits = allCommits.filter((commit) => commit.author && commit.author.login === "bardolog1");
  const ownerCommits = allCommits;
  console.log(`Commits para el repositorio ${repo.name}:`, ownerCommits.length);

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
  
<div align="center">
  <img src="https://raw.githubusercontent.com/bardolog1/bardolog1/master/images/Banner developer (2).gif" alt="Contributions" width="100%"  />
</div>
<div align="center">
  <img src="https://raw.githubusercontent.com/bardolog1/bardolog1/master/profile-3d-contrib/profile-night-rainbow.svg" alt="Contributions" width="100%"  />
</div>
    # Mi Proyecto de Readme Actualizado con GitHub Actions 
    
    Estadísticas actualizadas por GH Actions:
    
    - Total de repositorios: ${updatedStats.totalPrivateRepos + updatedStats.totalPublicRepos}
    - Total de commits: ${updatedStats.totalCommits} 
    - Total de estrellas: ${updatedStats.totalStars}
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
      totalPullRequests += await getPullRequests(repo);
      totalStars += await getStargazers(repo);

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
    console.log("Total commmits: ",updatedStats.totalCommits);
    await updateReadme(updatedStats);
  } catch (error) {
    console.error("Error:", error);
  }
}



async function run() {
  await getStats();
}

run();
