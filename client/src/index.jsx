import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import Parse from './requestHandler.js';

const App = () => {

  const [repos, setRepos] = useState([]);
  const [rerender, setRerender] = useState(true);

  useEffect(() => {
    setRerender(false);
    setTimeout(() => {
      Parse.pullRepos((data) => setRepos(data));
      setRerender(true);
    }, 10000);
  }, [rerender])

  const search = (term) => {
    console.log(`${term} was searched`);
    Parse.updateDatabase(term, Parse.pullRepos((data) => setRepos(data)));
  }

  return (
    <div className="app">
      <div className="title">Github Fetcher</div>
      <Search onSearch={search}/>
      <RepoList repos={repos}/>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));