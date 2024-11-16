// src/components/Navbar.js

import React from 'react';
import { FaHome, FaTasks, FaChartLine, FaUser, FaStore, FaUsers } from 'react-icons/fa';
import { useSpring, animated } from 'react-spring';

function Navbar({ currentPage, setCurrentPage, userCredits }) {
  // Animation for the credits counter
  const creditAnimation = useSpring({
    number: userCredits,
    config: { duration: 500 },
  });

  const menuItems = [
    { name: 'home', icon: <FaHome />, label: 'Home' },
    { name: 'challenges', icon: <FaTasks />, label: 'Challenges' },
    { name: 'impact', icon: <FaChartLine />, label: 'Impact' },
    { name: 'shop', icon: <FaStore />, label: 'Shop' },
    { name: 'community', icon: <FaUsers />, label: 'Community' },
    { name: 'profile', icon: <FaUser />, label: 'Profile' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div className="flex items-center justify-between px-4 py-3 relative">
        {/* Place ecoQuest and Credits Counter in top center */}
        <div className="absolute top-3 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <h1 className="text-4xl font-bold text-cream">ecoQuest</h1>
          <div className="flex items-center bg-greenDark rounded-full px-4 py-2 mt-2">
            <FaUser className="h-6 w-6 text-cream" />
            <animated.span className="ml-2 text-xl text-cream font-bold">
              {creditAnimation.number.to((n) => Math.floor(n))}
            </animated.span>
          </div>
        </div>
      </div>
      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 w-full bg-darkLighter shadow-inner">
        <div className="flex justify-around">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setCurrentPage(item.name)}
              className={`flex flex-col items-center py-2 w-full ${
                currentPage === item.name ? 'text-greenLight' : 'text-cream'
              }`}
            >
              <div className="text-2xl">{item.icon}</div>
              <span className="text-sm">{item.label}</span>
              {currentPage === item.name && (
                <div className="w-2 h-2 bg-greenLight rounded-full mt-1"></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
