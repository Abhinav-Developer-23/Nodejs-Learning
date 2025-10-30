const axios = require('axios');

const fetchExternalData = async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch external data: ${error.message}`);
  }
};

module.exports = {
  fetchExternalData
};

