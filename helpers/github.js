const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (user, callback) => new Promise((resolve, reject) => {
  let options = {
    baseURL: `https://api.github.com/users`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  const axiosRequest = axios.create(options);

  axiosRequest.get(`/${user}/repos`)
  .then(data => resolve(data))
  .catch(err => reject(err));
})

module.exports.getReposByUsername = getReposByUsername;