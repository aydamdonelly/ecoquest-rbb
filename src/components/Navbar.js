// src/components/Navbar.js

import React, { useState } from 'react';
import { FaBars, FaHome, FaTasks, FaChartLine, FaUser } from 'react-icons/fa';
import './Navbar.css';

function Navbar({ currentPage, setCurrentPage }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = (page) => {
    setCurrentPage(page);
    setIsOpen(false);
  };

  return (
    <div className="navbar">
      <div className="hamburger" onClick={toggleDrawer}>
        <FaBars />
      </div>
      <h1 className="navbar-title">EcoQuest</h1>
      <div className={`drawer ${isOpen ? 'open' : ''}`}>
        <div className="drawer-item" onClick={() => handleNavigation('home')}>
          <FaHome />
          <span>Home</span>
        </div>
        <div className="drawer-item" onClick={() => handleNavigation('challenges')}>
          <FaTasks />
          <span>Challenges</span>
        </div>
        <div className="drawer-item" onClick={() => handleNavigation('impact')}>
          <FaChartLine />
          <span>Impact</span>
        </div>
        <div className="drawer-item" onClick={() => handleNavigation('profile')}>
          <FaUser />
          <span>Profil</span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
