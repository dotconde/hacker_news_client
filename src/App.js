import React from 'react';
import {Component, useState, useEffect} from 'react';

const App = () => {
  // States
  const [news, setNews] = useState([]);
  const [searchQuery,setSearchQuery] = useState('react');
  const [url, setUrl] = useState('http://hn.algolia.com/api/v1/search?query=react');
  const [loading,setLoading] = useState(false)
  // Fetch News from Hacker News API
  const fetchNews = () => {
    // Set loading true when fetching data from API
    setLoading(true)
    fetch(url)
    .then(result => result.json())
    .then(data => (setNews(data.hits),setLoading(false)))
    .catch(error => console.log(error));
  };

  useEffect(()=>{
    fetchNews();
  }, [url])

  const handleChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setUrl(`http://hn.algolia.com/api/v1/search?query=${searchQuery}`)
  }
  
  const showLoading = () => (
    loading ? <h2>Loading...</h2> : ""
  )

  const searchForm = () => (
    <form onSubmit={handleSubmit}>
        <input type="text" value={searchQuery} onChange={handleChange}/>
        <button> Search </button>
    </form>
  )

  const showNews = () => (
    news.map((n,i) => (
      <div>
      <p key={i}>{i+1}) {n.title}</p>
      </div>
    ))
  )

  return(
    <div>
      <b> News </b>
      { showLoading() }
      { searchForm() }
      { showNews() }
    </div>
  );
};

export default App;
