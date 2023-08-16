import { Octokit } from '@octokit/rest';

const octokit = new Octokit({
  auth: process.env.GH_TOKEN,
});

async function getStats() {
  try {
    const repos = await octokit.repos.listForAuthenticatedUser(); // Obtener los repositorios del usuario autenticado

    const lang = [];

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
    console.log('Lenguajes de programación:');
    console.log(lang);
    console.log('Repositorios:');
    console.log(repos.data);
  } catch (error) {
    console.error('Error:', error);
  }
}

getStats();