import React from 'react';
import RepoListComponent from './RepoListComponent.jsx';

const RepoList = ({ repos }) => {
  let allRepos = repos.map((repo) => {
    return <RepoListComponent key= { repo.id } repo={ repo }/>
  });

  return <div className="repo-list-container">
    <div className="repolist-title">Repo List</div>
    There are {repos.length} repos:
    <div>{allRepos}</div>
  </div>
}

export default RepoList;