const fetch = require('node-fetch');

const token = process.env.GH_TOKEN;

async function getStats() {
  try {
    const response = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
    } else {
      console.error('Error:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

getStats();
