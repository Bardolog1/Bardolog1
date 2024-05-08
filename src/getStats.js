import { getRepos } from "./repositories/getRepos";
import { getCommits } from "./stats/getCommits";
import { getLanguages } from "./stats/getLanguages";
import { getPullRequests } from "./stats/getPullRequest";
import { getStars } from "./stats/getStars";
import { calculateLangPercents } from "./utils/calculateLangPercents";
import { updateReadme } from "./utils/updateReadme";

const updatedStats = {
  totalCommits: 0,
  totalPrivateRepos: 0,
  totalPublicRepos: 0,
  totalPullRequests: 0,
  langPercents: 0,
  totalStars: 0,
  totalRepos: 0,
};

let owner = "";

export async function getStats(user) {

  owner = user.data.login;
  console.log("Owner:", owner);
  /*
  try {
    const lang = [];
    let totalCommits = 0;
    let totalPrivateRepos = 0;
    let totalPublicRepos = 0;
    let totalPullRequests = 0;
    let totalStars = 0;

    totalPrivateRepos = user.data.total_private_repos;
    totalPublicRepos = user.data.public_repos;
    const totalRepos = totalPrivateRepos + totalPublicRepos;

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
    } while (count < totalRepos);

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
  } catch (error) {
    console.error("Error:", error);
  }*/
}
