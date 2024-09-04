import React, { useState, useEffect } from "react";
import "./Feed.css";

const Feed = ({ subreddit, searchTerm }) => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const url = subreddit
      ? `https://www.reddit.com/r/${subreddit}/hot.json?limit=10`
      : "https://www.reddit.com/hot.json?limit=10";

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched data:", data); // Log the fetched data
        setPosts(data.data.children);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setError(error.message);
        setLoading(false);
      });
  }, [subreddit]);

  useEffect(() => {
    const filtered = posts.filter((post) =>
      post.data.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [posts, searchTerm]);

  const getPostImage = (post) => {
    if (
      post.data.thumbnail &&
      post.data.thumbnail !== "self" &&
      post.data.thumbnail !== "default"
    ) {
      return post.data.thumbnail;
    } else if (
      post.data.preview &&
      post.data.preview.images &&
      post.data.preview.images[0].source
    ) {
      return post.data.preview.images[0].source.url;
    }
    return null;
  };

  if (loading) {
    return <div className="feed">Loading posts...</div>;
  }

  if (error) {
    return <div className="feed">Error: {error}</div>;
  }

  return (
    <div className="feed">
      <h2>{subreddit ? `r/${subreddit}` : "Front Page"}</h2>
      {filteredPosts.map((post) => (
        <div key={post.data.id} className="post">
          <h3>{post.data.title}</h3>
          {getPostImage(post) && (
            <img
              src={getPostImage(post)}
              alt={post.data.title}
              className="post-image"
            />
          )}
          <p>Posted by u/{post.data.author}</p>
          <a
            href={`https://www.reddit.com${post.data.permalink}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on Reddit
          </a>
        </div>
      ))}
      {filteredPosts.length === 0 && <p>No posts match your search.</p>}
    </div>
  );
};

export default Feed;
