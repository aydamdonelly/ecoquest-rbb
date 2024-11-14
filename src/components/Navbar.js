import React, { useState } from 'react';
import { FaBars, FaTimes, FaHome, FaTasks, FaChartLine, FaUser, FaMoon, FaSun } from 'react-icons/fa';
import './Navbar.css'; // Optional: Für zusätzliche Tailwind-Utility-Klassen

function Navbar({ currentPage, setCurrentPage, darkMode, setDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = (page) => {
    setCurrentPage(page);
    setIsOpen(false);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-darkTeal dark:bg-gray-800 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="text-2xl font-black text-white">ecoQuest</div>
          </div>
          <div className="flex items-center">
            <button 
              onClick={toggleDarkMode} 
              className="text-xl text-yellow-400 focus:outline-none mr-4"
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>
            <div className="md:hidden">
              <button onClick={toggleDrawer} className="text-2xl text-white focus:outline-none">
                {isOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
            <div className="hidden md:flex space-x-4">
              <button 
                onClick={() => handleNavigation('home')} 
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${currentPage === 'home' ? 'text-buttonGreen' : 'text-white hover:text-buttonGreen'}`}
              >
                <FaHome className="mr-1 animate-pulse" /> Home
              </button>
              <button 
                onClick={() => handleNavigation('challenges')} 
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${currentPage === 'challenges' ? 'text-buttonGreen' : 'text-white hover:text-buttonGreen'}`}
              >
                <FaTasks className="mr-1 animate-pulse" /> Challenges
              </button>
              <button 
                onClick={() => handleNavigation('impact')} 
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${currentPage === 'impact' ? 'text-buttonGreen' : 'text-white hover:text-buttonGreen'}`}
              >
                <FaChartLine className="mr-1 animate-pulse" /> Impact
              </button>
              <button 
                onClick={() => handleNavigation('profile')} 
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${currentPage === 'profile' ? 'text-buttonGreen' : 'text-white hover:text-buttonGreen'}`}
              >
                <FaUser className="mr-1 animate-pulse" /> Profil
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Drawer für Mobile */}
      <div className={`md:hidden transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="bg-darkTeal dark:bg-gray-800 px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <button 
            onClick={() => handleNavigation('home')} 
            className={`flex items-center w-full px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${currentPage === 'home' ? 'text-buttonGreen' : 'text-white hover:text-buttonGreen'}`}
          >
            <FaHome className="mr-2" /> Home
          </button>
          <button 
            onClick={() => handleNavigation('challenges')} 
            className={`flex items-center w-full px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${currentPage === 'challenges' ? 'text-buttonGreen' : 'text-white hover:text-buttonGreen'}`}
          >
            <FaTasks className="mr-2" /> Challenges
          </button>
          <button 
            onClick={() => handleNavigation('impact')} 
            className={`flex items-center w-full px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${currentPage === 'impact' ? 'text-buttonGreen' : 'text-white hover:text-buttonGreen'}`}
          >
            <FaChartLine className="mr-2" /> Impact
          </button>
          <button 
            onClick={() => handleNavigation('profile')} 
            className={`flex items-center w-full px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${currentPage === 'profile' ? 'text-buttonGreen' : 'text-white hover:text-buttonGreen'}`}
          >
            <FaUser className="mr-2" /> Profil
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
