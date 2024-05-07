import { Octokit } from "@octokit/rest";
import { promises as fs } from "fs";

const octokit = new Octokit({
  auth: process.env.GH_TOKEN,
});

async function getLanguages(repo) {
  const languages = await octokit.request(
    "GET /repos/{owner}/{repo}/languages",
    {
      owner: "bardolog1",
      repo: repo.name,
    }
  );

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

      //console.log(commitsResponse);

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
      console.error(
        `Error obteniendo commits para el repositorio ${repo.name}:`,
        error.message
      );
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

async function getStargazersUser(repo) {
  const stargazers = await octokit.activity.listStargazersForRepo({
    owner: "bardolog1",
    repo: repo.name,
  });
  
  if (stargazers) {
  const users ={}
    console.log("repo", repo);
    console.log("Repo: ", repo.name, " STARGAZERS: ",  stargazers.data.length, "private: ");
    for (const stargazer of stargazers.data) {
      users[stargazer.login] = stargazer.login;
    }
    console.log(users);
    return 1;
  } else {
    return 0;
  }
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
<img src="https://raw.githubusercontent.com/Bardolog1/Bardolog1/master/images/Bannerdeveloper.gif" alt="Contributions" width="100%"  />
<img width=100% src="https://capsule-render.vercel.app/api?type=waving&color=057EEF&height=120&section=header"/>
</div>

<h2 align="center">Hi 👋! My name is Libardo Lozano  and I'm a Software Developer</h2>

<div align="center">
<img src="https://raw.githubusercontent.com/Bardolog1/Bardolog1/master/images/dev1.png" min-width="400px" max-width="400px" width="400px" align="right" alt="Computador"/>
<p align="left">
    Experienced software developer with a strong foundation in both programming and additional expertise in design and basic electronics. I bring over 3 years of hands-on experience in software development, coupled with excellent communication skills, a quick learning aptitude, leadership qualities, and a readiness to embrace change. 
</p>
<img width=100% src="https://capsule-render.vercel.app/api?type=waving&color=FF2967&height=120&section=footer"/>
</div>
</div>


<div align="center">
<img src="https://raw.githubusercontent.com/Bardolog1/Bardolog1/master/profile-3d-contrib/profile-night-rainbow.svg" alt="Contributions" width="100%" aling="right"  />
<!--<img width=45% align="center" src="https://github-readme-stats-bardolog1.vercel.app/api?username=bardolog1&show_icons=true&theme=dracula&show=repos&count_private=true&include_all_commits=true&hide=contribs,issues" aling="left"/>-->
<img width=100% src="https://capsule-render.vercel.app/api?type=waving&color=057EEF&height=120&section=header"/>
</div>

<!--https://raw.githubusercontent.com/Bardolog1/Bardolog1/master-->

# THIS README IS UNDER CONSTRUCTION

## Principal Stack:
<div aling="center">
  <a href="#">
    <img src="https://img.shields.io/badge/Java-007396?style=for-the-badge&logo=java&logoColor=white" target="_blank">
  </a>
  <a href="#">
    <img src="https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white" target="_blank">
  </a>
  <a href="#">
    <img src="https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white" target="_blank">
  </a>
  <a href="#">
    <img src="https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white" target="_blank">
  </a>


## Contacts:
 <div align="left">
<a href="mailto:liloga.dev@gmail.com">
  <img src="https://img.shields.io/badge/-Gmail-%23333?style=for-the-badge&logo=gmail&logoColor=white" target="_blank">
</a>
<a href="https://www.linkedin.com/in/bardolog1/" target="_blank">
  <img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank">
</a>
<a href="https://t.me/bardolog1/" target="_blank">
  <img src="https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white" target="_blank">
</a>
<a href="https://www.instagram.com/bardolog1/" target="_blank">
  <img src="https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" alt="whatsapp logo">
</a>

 # Mi Proyecto de Readme Actualizado con GitHub Actions
[![Run GH Actions & GH Stats](https://github.com/Bardolog1/Bardolog1/actions/workflows/runGHActions.yml/badge.svg)](https://github.com/Bardolog1/Bardolog1/actions/workflows/runGHActions.yml)    
    
    Estadísticas actualizadas por GH Actions (Falta perfeccionar):
    
    - Total de repositorios: ${
      updatedStats.totalPrivateRepos + updatedStats.totalPublicRepos
    }
    - Total de commits: ${updatedStats.totalCommits} 
    - Total de estrellas: ${updatedStats.totalStars}
    - Last update :${new Date().toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })}

    - ...
    
<div align="center">
<img width=100% src="https://capsule-render.vercel.app/api?type=waving&color=FF2967&height=120&section=footer"/>
</div>
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
    let totalStars = 0;
    
    const user = await getUser();
    const repos = await getRepos();
    
    for (const repo of repos.data) {
      if (repo.owner.login.toLowerCase()  !== "bardolog1") {
          repos.data.splice(repos.data.indexOf(repo), 1);
          continue;
      }
      const repoLanguages = await getLanguages(repo);
        for (const language in repoLanguages) {
          if (lang.find((l) => l.name === language)) {
            lang.find((l) => l.name === language).value +=
              repoLanguages[language];
          } else {
            lang.push({ name: language, value: repoLanguages[language] });
          }
        }
        totalCommits += await getCommits(repo);
        totalPullRequests += await getPullRequests(repo);
        totalStars += await getStargazers(repo);
        totalStars += await getStargazersUser(repo);
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
    console.log("Total commmits: ", updatedStats.totalCommits);
    
    await updateReadme(updatedStats);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function run() {
  await getStats();
}

run();
