import { getRepos } from "./repositories/getRepos.js";
import { getCommitsLengthByRepo } from "./stats/getCommits.js";
import { getLanguages } from "./stats/getLanguages.js";
import { getPullRequests } from "./stats/getPullRequest.js";
import { calculateLangPercents } from "./utils/calculateLangPercents.js";
import { updateReadme } from "./utils/updateReadme.js";

const STATS_TEMPLATE = {
  owner: "",
  totalCommits: 0,
  totalPullRequests: 0,
  totalPrivateRepos: 0,
  totalPublicRepos: 0,
  totalRepos: 0,
  langPercents: [],
  totalStars: 0,
  lang: [],
  repos: [],
};

const BATCH_SIZE = 3;

function createInitialStats() {
  return {
    ...STATS_TEMPLATE,
    langPercents: [],
    lang: [],
    repos: [],
  };
}

async function collectRepoMetrics(repo, owner) {
  try {
    const [repoLanguages, repoPullRequests] = await Promise.all([
      getLanguages(repo.name, owner),
      getPullRequests(repo.name, owner),
    ]);

    const skipCommitCount =
      repo.size <= 0 && repo.watchers_count <= 0 && repo.language === null;

    const repoCommits = skipCommitCount
      ? 0
      : await getCommitsLengthByRepo(repo.name, owner);

    return {
      languages: repoLanguages,
      pullRequests: repoPullRequests,
      stars: repo.stargazers_count ?? 0,
      commits: repoCommits,
    };
  } catch (error) {
    console.error(
      `Error procesando el repositorio ${repo.name}:`,
      error.message
    );

    return {
      languages: {},
      pullRequests: 0,
      stars: repo.stargazers_count ?? 0,
      commits: 0,
    };
  }
}

async function collectReposInBatches(repos, owner) {
  const metrics = [];

  for (let index = 0; index < repos.length; index += BATCH_SIZE) {
    const batch = repos.slice(index, index + BATCH_SIZE);
    const batchMetrics = await Promise.all(
      batch.map((repo) => collectRepoMetrics(repo, owner))
    );
    metrics.push(...batchMetrics);
  }

  return metrics;
}

export async function getStats(user) {
  const updatedStats = createInitialStats();

  updatedStats.owner = user.data.login;
 
  try {
    updatedStats.totalPrivateRepos = user.data.total_private_repos;
    updatedStats.totalPublicRepos = user.data.public_repos;
    updatedStats.totalRepos = updatedStats.totalPrivateRepos + updatedStats.totalPublicRepos;

    let page = 1;
    const repos = [];

    while (true) {
      const reposPage = await getRepos(page++, 100);
      repos.push(...reposPage.data);

      if (reposPage.data.length < 100) {
        break;
      }
    }

    const ownerRepos = repos.filter(
      (repo) =>
        repo.owner?.login?.toLowerCase() === updatedStats.owner.toLowerCase()
    );

    updatedStats.repos = ownerRepos.map((repo) => repo.name);

    const reposMetrics = await collectReposInBatches(
      ownerRepos,
      updatedStats.owner
    );

    const languageTotals = new Map();

    for (const repoMetrics of reposMetrics) {
      for (const [language, bytes] of Object.entries(repoMetrics.languages)) {
        languageTotals.set(language, (languageTotals.get(language) ?? 0) + bytes);
      }

      updatedStats.totalPullRequests += repoMetrics.pullRequests;
      updatedStats.totalStars += repoMetrics.stars;
      updatedStats.totalCommits += repoMetrics.commits;
    }

    updatedStats.lang = Array.from(languageTotals.entries()).map(
      ([name, value]) => ({ name, value })
    );
    
    updatedStats.langPercents = await calculateLangPercents(updatedStats.lang);
  
    await updateReadme(updatedStats);
   
  } catch (error) {
    console.error("Error:", error);
  }
}
