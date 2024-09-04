import React, { useState, useEffect } from 'react';
import './Sidebar.css';

const Sidebar = ({ onSubredditChange, isOpen }) => {
  const [subreddit, setSubreddit] = useState('');
  const [popularSubreddits, setPopularSubreddits] = useState([]);

  useEffect(() => {
    fetch('https://www.reddit.com/subreddits/popular.json?limit=10')
      .then(response => response.json())
      .then(data => {
        setPopularSubreddits(data.data.children.map(child => ({
          name: child.data.display_name,
          icon: child.data.icon_img || child.data.community_icon || null
        })));
      })
      .catch(error => console.error('Error fetching popular subreddits:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubredditChange(subreddit);
  };

  const handleSubredditClick = (selectedSubreddit) => {
    onSubredditChange(selectedSubreddit);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <h2>Choose a Subreddit</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={subreddit}
          onChange={(e) => setSubreddit(e.target.value)}
          placeholder="Enter subreddit name"
        />
        <button type="submit">Load Posts</button>
      </form>
      <h3>Popular Subreddits</h3>
      <ul className="popular-subreddits">
        {popularSubreddits.map(sub => (
          <li key={sub.name} onClick={() => handleSubredditClick(sub.name)}>
            {sub.icon && <img src={sub.icon} alt={`r/${sub.name} icon`} className="subreddit-icon" />}
            r/{sub.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;