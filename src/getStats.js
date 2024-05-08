import { getRepos } from "./repositories/getRepos.js";
import { getCommits } from "./stats/getCommits.js";
import { getLanguages } from "./stats/getLanguages.js";
import { getPullRequests } from "./stats/getPullRequest.js";
import { getStars } from "./stats/getStars.js";
import { calculateLangPercents } from "./utils/calculateLangPercents.js";
import { updateReadme } from "./utils/updateReadme.js";

const updatedStats = {
  owner: "",
  totalCommits: 0,
  totalPrivateRepos: 0,
  totalPublicRepos: 0,
  totalPullRequests: 0,
  langPercents: 0,
  totalStars: 0,
  totalRepos: 0,
  lang: [],
};



export async function getStats(user) {

  updatedStats.owner = user.data.login;
  console.log("Owner:", updatedStats.owner);
  
  try {
    
    

    updatedStats.totalPrivateRepos = user.data.total_private_repos;
    updatedStats.totalPublicRepos = user.data.public_repos;
    updatedStats.totalRepos = updatedStats.totalPrivateRepos + updatedStats.totalPublicRepos;
    
    
    console.log("Stats object", updatedStats);
  
    let page = 1;
    const repos = [];
    let count = 0;
    let reposVal = 0;
    do {
      reposVal = await getRepos(page++, 100);
      count += reposVal.data.length;
      reposVal.data.forEach((repo) => {
        repos.push(repo);
      });
    } while (count < updatedStats.totalRepos);
    
    count = 0;
    repos.forEach(async (repo) => {
      count++;
      console.log("Repo:", repo.name,"  ", count, "/", updatedStats.totalRepos);
    });
    
/*
    for (const repo of repos) {
      if (repo.owner.login.toLowerCase() !== "bardolog1") {
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
      totalStars += await getStars(repo);
    }

    totalPrivateRepos = user.data.total_private_repos;
    totalPublicRepos = user.data.public_repos;

    updatedStats = {
      langPercents: await calculateLangPercents(lang),
      totalCommits,
      totalPullRequests,
      totalStars,
      totalPrivateRepos,
      totalPublicRepos,
      totalRepos: totalPrivateRepos + totalPublicRepos,
    };

    await updateReadme(updatedStats);
    */
  } catch (error) {
    console.error("Error:", error);
  }
}
