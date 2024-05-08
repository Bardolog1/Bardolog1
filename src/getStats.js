import { getRepos } from "./repositories/getRepos.js";
import { getCommitsLengthByRepo } from "./stats/getCommits.js";
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
  repos: [],
};



export async function getStats(user) {

  updatedStats.owner = user.data.login;
 
  try {
    updatedStats.totalPrivateRepos = user.data.total_private_repos;
    updatedStats.totalPublicRepos = user.data.public_repos;
    updatedStats.totalRepos = updatedStats.totalPrivateRepos + updatedStats.totalPublicRepos;

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

    repos.forEach((repo) => {
      updatedStats.repos.push(repo.name);
    });
    
    console.log("Repos", repos[0]);
    for (const repo of repos) {
    
      if (repo.owner.login.toLowerCase() !== updatedStats.owner.toLowerCase()) {
        repos.data.splice(repos.data.indexOf(repo), 1);
        continue;
      }
      
      const repoLanguages = await getLanguages(repo.name, updatedStats.owner);
      
      for (const language in repoLanguages) {
      
        if (updatedStats.lang.find((l) => l.name === language)) {
          updatedStats.lang.find((l) => l.name === language).value +=
            repoLanguages[language];
        } else {
          updatedStats.lang.push({ name: language, value: repoLanguages[language] });
        }
        
      }
      
      
      updatedStats.totalCommits += await getCommitsLengthByRepo(repo.name, updatedStats.owner);
      updatedStats.totalPullRequests += await getPullRequests(repo.name, updatedStats.owner);
      updatedStats.totalStars += await getStars(repo.name, updatedStats.owner);
      
    }
    
    console.log("Stats object", updatedStats);
  
/*
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
