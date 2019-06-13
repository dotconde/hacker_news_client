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

  return(
    <div>
      <b> News </b>
      { loading ? <h2>Loading...</h2> : ""}
      <form onSubmit={handleSubmit}>
        <input type="text" value={searchQuery} onChange={handleChange}/>
        <button> Search </button>
      </form>

      {news.map((n,i) => (
        <div>
        <p key={i}>{i+1}) {n.title}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
