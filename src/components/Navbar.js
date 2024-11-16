// src/components/Navbar.js

import React from 'react';
import { FaHome, FaTasks, FaChartLine, FaUser, FaStore, FaUsers, FaLeaf } from 'react-icons/fa';
import { useSpring, animated } from 'react-spring';
import CO2ProgressBar from './CO2ProgressBar';

function Navbar({ currentPage, setCurrentPage, userCredits, totalCO2Saved }) {
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
    { name: 'profile', icon: <FaUser />, label: 'Profil' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      {/* Top Navigation */}
      <div className="flex items-center justify-between px-4 py-2">
        {/* Left - ecoQuest */}
        <div className="flex items-center">
          <h1 className="text-4xl font-bold text-cream">ecoQuest</h1>
        </div>

        {/* Middle - Progress Bar */}
        <div className="flex-1 flex justify-center items-center" style={{ marginTop: '4px' }}>
          <CO2ProgressBar totalCO2Saved={totalCO2Saved} />
        </div>

        {/* Right - Credits Counter */}
        <div className="flex items-center">
          <FaLeaf className="h-8 w-8 text-greenLight" />
          <animated.span className="ml-2 text-2xl text-cream font-bold">
            {creditAnimation.number.to((n) => Math.floor(n))}
          </animated.span>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 w-full mb-2">
        <div className="flex justify-around">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setCurrentPage(item.name)}
              className="focus:outline-none"
            >
              <div
                className={`flex flex-col items-center ${
                  currentPage === item.name ? 'text-greenLight' : 'text-cream'
                }`}
              >
                <div
                  className={`text-xl p-1 rounded-full ${
                    currentPage === item.name ? 'bg-greenLight text-dark' : 'bg-transparent'
                  } transition-transform duration-200 ${
                    currentPage === item.name ? 'scale-105' : ''
                  }`}
                >
                  {item.icon}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
