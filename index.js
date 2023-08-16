import { Octokit } from '@octokit/rest';

const octokit = new Octokit({
  auth: process.env.GH_TOKEN, // Token de acceso
});

async function getStats() {
  try {
    const repos = await octokit.request('GET /user/repos', {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })

    console.log(repos.data);
    console.log("Tamaño: ",repos.data.length);
    console.log(repos.data.map(repo => repo.name));

  } catch (error) {
    console.error('Error:', error.message);
  }

  try{

    const user = await octokit.request('GET /user', {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })

    console.log(user.data);
    
  }catch(error){
    console.error('Error:', error.message);
  }
}

getStats();