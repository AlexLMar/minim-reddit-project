import React from 'react';
import { useTheme } from '../context/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed z-90 bottom-10 right-10 bg-violet-400 dark:bg-orange-300 
                 bg-opacity-80 w-12 h-12 rounded-full drop-shadow-lg 
                 flex justify-center items-center text-white text-2xl 
                 hover:bg-opacity-100 hover:drop-shadow-2xl 
                 transition-all duration-300 sm:bottom-5 sm:right-5"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? '🌞' : '🌙'}
    </button>
  );
}