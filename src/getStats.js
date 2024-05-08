


export async function getStats(user) {
  try {
    const lang = [];
    let totalCommits = 0;
    let totalPrivateRepos = 0;
    let totalPublicRepos = 0;
    let totalPullRequests = 0;
    let totalStars = 0;
    
    const user = await getUser();
    
    
    totalPrivateRepos = user.data.total_private_repos;
    totalPublicRepos = user.data.public_repos;
    const totalRepos = totalPrivateRepos + totalPublicRepos;
    
    let page = 1;
    const repos = [];
    let count = 0;
    let reposVal =0;
     do{
      reposVal = await getRepos(page++, 100);
      count +=  reposVal.data.length;
      reposVal.data.forEach((repo) => {
        repos.push(repo);
      })
    } while (count < totalRepos);
    
  
    
    repos.forEach((repo) => {
      console.log("Repo: ", repo.name, "private: ", repo.private);
    })
    
    for (const repo of repos) {
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
        totalStars += await getStars(repo);
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