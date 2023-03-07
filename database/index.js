const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  id: { type: Number, unique: true },
  name: String,
  owner: Object,
  updated_at: Date,
  html_url: String,
  stargazers_count: Number,
  watchers_count: Number,
  forks_count: Number,
  popularity: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let popularityScore = (repoObj) => {
  let popVariables = [repoObj.forks_count, repoObj.stargazers_count, repoObj.watchers_count];
  let varWeightings = [1000, 10, 1];
  let total = 0;

  for (let i = 0; i < popVariables.length; i++) {
    total += popVariables[i] * varWeightings[i]
  }

  return total;
}

let saveUserRepos = (githubData) => new Promise((resolve, reject) =>
  githubData.data.forEach(repoData => {
    repoData.popularity = popularityScore(repoData);
    const newRepo = new Repo(repoData);
    // console.log("TESt", newRepo);
    newRepo.save((err, newRepo) => {
      if (err) reject(`ERROR: There was a problem saving the repo to the database: ${err}`);
      resolve();
    })
  })
);

let findTopResults = (numberOfResults) => new Promise((resolve, reject) =>
  Repo.find({})
  .limit(numberOfResults)
  .sort('-popularity')
  .select('id name owner updated_at html_url stargazers_count watchers_count forks_count')
  .exec((err, data) => {
    // Repo.deleteMany({}).then(() => {
    //   console.log('deleted?')
      if (err) reject(`ERROR: There was a problem pulling data from the database: ${err}`);
      resolve(data);
    // });
  })
);

module.exports.saveUserRepos = saveUserRepos;
module.exports.findTopResults = findTopResults;