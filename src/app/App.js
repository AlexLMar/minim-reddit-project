import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Header from '../features/Header/Header';
import Feed from '../features/Feed/Feed';
import Sidebar from '../features/Sidebar/Sidebar';

import { setIsMobile, toggleSidebar, setSubreddit, setSearchTerm } from '../redux/slices/appSlice';

import styles from './App.module.css';

function App() {
  const dispatch = useDispatch();
  const { subreddit, searchTerm, isSidebarOpen, isMobile } = useSelector((state) => state.app);

  useEffect(() => {
    const handleResize = () => {
      dispatch(setIsMobile(window.innerWidth <= 768));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch]);

  const handleSubredditChange = (newSubreddit) => {
    dispatch(setSubreddit(newSubreddit));
  };

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const handleSetSearchTerm = (term) => {
    dispatch(setSearchTerm(term));
  };

  return (
    <div className={styles.app}>
      <Header setSearchTerm={handleSetSearchTerm} toggleSidebar={handleToggleSidebar} />
      <div className={styles.content}>
        <Feed subreddit={subreddit} searchTerm={searchTerm} />
        <Sidebar 
          onSubredditChange={handleSubredditChange} 
          isOpen={isMobile ? isSidebarOpen : true}
        />
      </div>
    </div>
  );
}

export default App;