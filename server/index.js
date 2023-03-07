const express = require('express');
var cors = require('cors')
const controller = require('./controller.js');

let app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Router
app.post('/repos', controller.updateDatabaseFromGithubData);
app.get('/repos', controller.pullTopResultsData);

let port = 1128;
app.use(express.static('./client/dist'));

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

