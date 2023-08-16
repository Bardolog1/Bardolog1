import { Octokit } from '@octokit/rest';

const octokit = new Octokit({
  auth: process.env.GH_TOKEN, // Token de acceso
});

async function getStats() {
  try {
    const user = await octokit.request('GET /user', {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })





    console.log(user.data);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

getStats();