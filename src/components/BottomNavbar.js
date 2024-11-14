import React from 'react';
import { FaHome, FaTasks, FaChartLine, FaUser } from 'react-icons/fa';
import './BottomNavbar.css';

function BottomNavbar({ currentPage, setCurrentPage }) {
  return (
    <nav className="bottom-navbar">
      <div 
        className={`nav-item ${currentPage === 'home' ? 'active' : ''}`} 
        onClick={() => setCurrentPage('home')}
      >
        <FaHome />
        <span>Home</span>
      </div>
      <div 
        className={`nav-item ${currentPage === 'challenges' ? 'active' : ''}`} 
        onClick={() => setCurrentPage('challenges')}
      >
        <FaTasks />
        <span>Challenges</span>
      </div>
      <div 
        className={`nav-item ${currentPage === 'impact' ? 'active' : ''}`} 
        onClick={() => setCurrentPage('impact')}
      >
        <FaChartLine />
        <span>Impact</span>
      </div>
      <div 
        className={`nav-item ${currentPage === 'profile' ? 'active' : ''}`} 
        onClick={() => setCurrentPage('profile')}
      >
        <FaUser />
        <span>Profil</span>
      </div>
    </nav>
  );
}

export default BottomNavbar;
