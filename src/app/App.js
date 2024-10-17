import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// Update these import paths
import { ThemeProvider } from "../context/ThemeContext";
import { ThemeToggle } from "../components/ThemeToggle";

import Header from "../features/Header/Header";
import Feed from "../features/Feed/Feed";
import Sidebar from "../features/Sidebar/Sidebar";

import {
  setIsMobile,
  toggleSidebar,
  setSubreddit,
  setSearchTerm,
} from "../redux/slices/appSlice";

function App() {
  const dispatch = useDispatch();
  const { subreddit, searchTerm, isSidebarOpen, isMobile } = useSelector(
    (state) => state.app
  );

  useEffect(() => {
    const handleResize = () => {
      dispatch(setIsMobile(window.innerWidth <= 768));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
    <ThemeProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <Header
          setSearchTerm={handleSetSearchTerm}
          toggleSidebar={handleToggleSidebar}
        />
        <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row">
          <div className="w-full md:w-3/4 pr-0 md:pr-8">
            <Feed subreddit={subreddit} searchTerm={searchTerm} />
          </div>
          <Sidebar
            onSubredditChange={handleSubredditChange}
            isOpen={isMobile ? isSidebarOpen : true}
            className={`w-full md:w-1/4 mt-8 md:mt-0 ${
              isMobile && !isSidebarOpen ? "hidden" : ""
            }`}
          />
        </div>
        <ThemeToggle />
      </div>
    </ThemeProvider>
  );
}

export default App;
