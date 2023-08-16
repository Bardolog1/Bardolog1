import { Octokit } from '@octokit/rest';

const octokit = new Octokit({
  auth: process.env.GH_TOKEN, // Token de acceso
});

async function getStats() {
    const repos = await octokit.request('GET /user/repos', {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })
    const lang =[];

    repos.data.map(async repo => {
      const languages = await octokit.request('GET /repos/{owner}/{repo}/languages', {
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        },
        owner: 'bardolog1',
        repo: repo.name
      })

      languages.data.forEach
      (lenguage => {
        if (lang.find(l => l.name === lenguage.name)) {
          lang.find(l => l.name === lenguage.name).value += lenguage.value
        } else {
          lang.push(lenguage)
        }
      }
      )

    })

    console.log(lang);
  
    //console.log(repos.data);
    //console.log("Tamaño: ",repos.data.length);
    //console.log(repos.data.map(repo => repo.name));


  

    const user = await octokit.request('GET /user', {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })

    console.log(user.data);

 
}

getStats();