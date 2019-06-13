import React from 'react';
import {Component, useState, useEffect} from 'react';

const App = () => {
  // State
  const [news, setNews] = useState([])
  // Fetch News from Hacker News API
  const fetchNews = () => {
    fetch('http://hn.algolia.com/api/v1/search?query=react')
    .then(result => result.json())
    .then(data => setNews(data.hits))
    .catch(error => console.log(error));
  };

  useEffect(()=>{
    fetchNews()
  })

  return(
    <div>
      <b> Trending News About React </b>
      {news.map((n,i) => (
        <div>
        <p key={i}>{i+1}) {n.title}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
