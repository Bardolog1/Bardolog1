import { Octokit } from '@octokit/rest';
import * as d3 from 'd3';
import * as fs from 'fs/promises';


const octokit = new Octokit({
  auth: process.env.GH_TOKEN,
});

async function getStats(readmeFile) {
  
  try {

    const lang = [];
    let totalCommits = 0;
    let totalPrivateRepos =0;
    let totalPublicRepos =0;
    let totalPullRequests = 0;
    let totalStars = 0;
    const langPercents = [];

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

      const commits = await octokit.request('GET /repos/{owner}/{repo}/commits', {
        owner: 'bardolog1',
        repo: repo.name,
      });

      const pullRequests = await octokit.pulls.list({
        owner: 'bardolog1',
        repo: repo.name,
      });

      const stargazers = await octokit.activity.listStargazersForRepo({
        owner: 'bardolog1',
        repo: repo.name,
      });


      totalCommits += commits.data.length; //
      totalPullRequests += pullRequests.data.length;
      totalStars += stargazers.data.length;
    }

    lang.forEach(l => { // Recorrer los lenguajes de programación
     
      langPercents.push(
        { 
          name: l.name, 
          value: ((l.value * 100) / lang.reduce((a, b) => a + b.value, 0)).toFixed(2)
        }
        );

    }); // Calcular el porcentaje de uso de cada lenguaje de programación
   
    langPercents.sort((a, b) => b.value - a.value); // Ordenar los lenguajes de programación por porcentaje de uso
    totalPrivateRepos = user.data.total_private_repos;
    totalPublicRepos = user.data.public_repos;

    console.log('Usuario:', user.data.login);
    console.log('Nombre:', user.data.name);
    console.log('Bio:', user.data.bio);
    console.log('Total de repositorios:', totalPrivateRepos + totalPublicRepos);
    console.log('Total de commits:', totalCommits);
    console.log('Lenguajes de programación:');
    /*
    console.log(langPercents);
    console.log('Total de pull requests:', totalPullRequests);
    console.log('Total de estrellas:', totalStars);
    console.log('Total de seguidores:', user.data.followers);
    console.log('Total de seguidos:', user.data.following);
    console.log('Total de gists:', user.data.public_gists);
    console.log('Total de repositorios privados:', totalPrivateRepos);
    console.log('Total de repositorios públicos:', totalPublicRepos);
    console.log('Repositorios:');
    console.log(repos.data);
    */

     const readmePath = './README.md';

    // Crear el contenido actualizado del archivo readme
    const updatedReadmeContent = `
      # Mi Proyecto
      
      Estadísticas actualizadas:
      
      - Total de repositorios: ${totalPrivateRepos + totalPublicRepos}
      - Total de commits: ${totalCommits}
      - ...
      
      ${fs.readFileSync(readmePath, 'utf-8')}
      `;
      
      // Escribir el contenido actualizado en el archivo readme
      await fs.writeFile(readmePath, updatedReadmeContent);
      
  
    } catch (error) {
      console.error('Error:', error);
    }
  }



getStats();



