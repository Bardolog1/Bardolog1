import { Octokit } from '@octokit/rest';

const octokit = new Octokit({
  auth: process.env.GH_TOKEN, // Token de acceso
});

async function getStats() {
  try {
    const user = await octokit.rest.users.getAuthenticated();
    console.log(user.data);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

getStats();