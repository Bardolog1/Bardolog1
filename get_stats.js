
const axios = require('axios');

const token = process.env.GH_TOKEN;

axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

async function getStats() {
  try {
    const response = await axios.get('https://api.github.com/bardolog1'); 
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error);
  }
}

getStats();
