import React, { useState } from 'react'
import logo from '../../assets/reddit-logo.svg'
import './Header.css' // Add this import

const Header = ({ setSearchTerm, toggleSidebar }) => {
  const [localSearchTerm, setLocalSearchTerm] = useState('');

  const handleSearch = (e) => {
    const newSearchTerm = e.target.value;
    setLocalSearchTerm(newSearchTerm);
    setSearchTerm(newSearchTerm);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setLocalSearchTerm('');
      setSearchTerm('');
    }
  };

  return (
    <header className='header'>
      <img src={logo} alt="Reddit logo" className="header-logo" />
      <div className='header-search'>
        <input
          type="text"
          placeholder='Search Reddit'
          className="search-input"
          value={localSearchTerm}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
        />
      </div>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>
    </header>
  )
}

export default Header