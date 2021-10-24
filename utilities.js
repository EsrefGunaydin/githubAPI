const axios = require("axios");

// Helper function
const getCommits = async (url) => {
  try {
    let response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

module.exports = {
  getCommits,
};
