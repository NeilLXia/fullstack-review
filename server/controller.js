const githubAPI = require('../helpers/github.js')
const mongoDB = require('../database/index.js');

const defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, OPTIONS',
  'access-control-allow-headers': 'content-type, accept, authorization',
  'access-control-max-age': 10 // Seconds.
};

let returnResponse = (res, statusCode, contentType, responseBody) => {
  defaultCorsHeaders['Content-Type'] = contentType;
  res.writeHead(statusCode, defaultCorsHeaders)
  res.end(responseBody);
}

module.exports = {
  updateDatabaseFromGithubData: (req, res) => {
    if (req.body.username === '') {
      return returnResponse(res, 400, 'application/json', JSON.stringify("ERROR: Username input required"));
    }

    githubAPI.getReposByUsername(req.body.username)
    .then(data => mongoDB.saveUserRepos(data))
    .then(() => returnResponse(res, 201, 'application/json', JSON.stringify(
      `OK: Data from ${req.body.username} was loaded successfully to the server`)))
    .catch(err => returnResponse(res, 500, 'application/json', JSON.stringify(err)));
  },


  pullTopResultsData: (req, res) => {
    mongoDB.findTopResults(25)
    .then(data => returnResponse(res, 200, 'application/json', JSON.stringify(data)))
    .catch(err => returnResponse(res, 500, 'application/json', JSON.stringify(err)));
  }
}