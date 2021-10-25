const axios = require("axios");
const apiURL = `https://api.github.com/repos`;

async function getCommits(url) {
  try {
    let response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

// PR async function
const getPullRequests = async (owner, repo) => {
  try {
    let response = await axios.get(`${apiURL}/${owner}/${repo}/pulls?q=is:open+is:Apr`);
    const allRequests = response.data;
    // Loop thru all PR url addresses
    let allPromises = allRequests.map(async (singleRequest) => {
      let commits = await getCommits(singleRequest.commits_url);
      let commitCount = commits.length;
      return {
        title: singleRequest.title,
        url: singleRequest.url,
        id: singleRequest.id,
        numberOfCommits: commitCount,
      };
    });
    return Promise.all(allPromises);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getCommits,
  getPullRequests,
};
