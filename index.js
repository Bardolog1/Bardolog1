import { Octokit } from '@octokit/rest';

const octokit = new Octokit({
  auth: process.env.GH_TOKEN,
});

async function getStats() {
  try {

    const lang = [];
    let totalCommits = 0;
    let totalPrivateRepos =0;
    let totalPublicRepos =0;

    const user = await octokit.users.getAuthenticated(); // Obtener el usuario autenticado
    const repos = await octokit.repos.listForAuthenticatedUser(); // Obtener los repositorios del usuario autenticado

    

    for (const repo of repos.data) {
      const languages = await octokit.request('GET /repos/{owner}/{repo}/languages', {
        owner: 'bardolog1',
        repo: repo.name,
      });

      for (const language in languages.data) {
        if (lang.find(l => l.name === language)) {
          lang.find(l => l.name === language).value += languages.data[language];
        } else {
          lang.push({ name: language, value: languages.data[language] });
        }
      }
    }

    for (const repo of repos.data) {
      const commits = await octokit.request('GET /repos/{owner}/{repo}/commits', {
        owner: 'bardolog1',
        repo: repo.name,
      });

      totalCommits += commits.data.length;
    }
    totalPrivateRepos = user.data.total_private_repos;
    totalPublicRepos = user.data.public_repos;
    console.log('Usuario:', user.data.login);
    console.log('Nombre:', user.data.name);
    console.log('Bio:', user.data.bio);
    console.log('Total de repositorios:', totalPrivateRepos + totalPublicRepos);
    console.log('Total de commits:', totalCommits);
    console.log('Lenguajes de programación:');
    console.log(lang);
    console.log('Repositorios:');
    console.log(repos.data);
    

  } catch (error) {
    console.error('Error:', error);
  }
}

getStats();