import React from 'react';

const RepoListComponent = ({ repo }) => (
  <div className="repo-table">
    <div className='repo-title'><a href={repo.html_url}>{repo.name}</a></div>
    <div className="starred-count">Starred: <b>{repo.stargazers_count}</b></div>
    <div className="forked-count">Forks: <b>{repo.forks_count}</b></div>
    <div className="watched-count"  >Watched: <b>{repo.watchers_count}</b></div>
    <div className='repo-username'>User: <b>{repo.owner.login}</b></div>
    {/* <div className='repo-username'>{JSON.stringify(repo)} </div> */}
  </div>
)

export default RepoListComponent;