import React, { useState } from 'react';

const Search = ({ onSearch }) => {

  const[term, setTerm] = useState('')

  const onChange = (e) => {
    setTerm(e.target.value);
  }

  const search = () => {
    onSearch(term);
  }

  return (
    <div className="search-container">
      Enter a github username: <input value={term} onChange={onChange} placeholder="Add more repos!"/>
      <button onClick={search}> Add Repos </button>
    </div>
  );
}

export default Search;