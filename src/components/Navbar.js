// src/components/Navbar.js

import React, { useEffect, memo } from 'react';
import {
  FaHome,
  FaTasks,
  FaChartLine,
  FaUser,
  FaStore,
  FaUsers,
  FaLeaf,
} from 'react-icons/fa';
import { useSpring, animated } from 'react-spring';
import CO2ProgressBar from './CO2ProgressBar'; // Progressbar importieren

function Navbar({ currentPage, setCurrentPage, userCredits }) {
  // Animation für den ecoCoins-Zähler
  const [creditAnimation, setCreditAnimation] = useSpring(() => ({
    number: userCredits,
    config: { duration: 500 },
  }));

  useEffect(() => {
    setCreditAnimation({ number: userCredits });
  }, [userCredits, setCreditAnimation]);

  const menuItems = React.useMemo(
    () => [
      { name: 'home', icon: <FaHome />, label: 'Startseite' },
      { name: 'challenges', icon: <FaTasks />, label: 'Herausforderungen' },
      { name: 'impact', icon: <FaChartLine />, label: 'Impact' },
      { name: 'shop', icon: <FaStore />, label: 'Shop' },
      { name: 'community', icon: <FaUsers />, label: 'Community' },
      { name: 'profile', icon: <FaUser />, label: 'Profil' },
    ],
    []
  );

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      {/* Obere Navigation */}
      <div className="flex flex-col items-center px-4 py-2 bg-transparent">
        {/* ecoQuest und ecoCoins */}
        <div className="flex items-center justify-between w-full">
          {/* Links - ecoQuest */}
          <div className="flex items-center">
            <h1 className="text-6xl font-bold text-cream">ecoQuest</h1>
          </div>

          {/* Rechts - ecoCoins Zähler */}
          <div className="flex items-center">
            <FaLeaf className="h-12 w-12 text-greenLight" />
            <animated.span className="ml-2 text-4xl text-cream font-bold">
              {creditAnimation.number.to((n) => Math.floor(n))}
            </animated.span>
          </div>
        </div>

        {/* Progressbar nur auf der Startseite anzeigen */}
        {currentPage === 'home' && (
          <div className="w-full mt-[15px]">
            <CO2ProgressBar />
          </div>
        )}
      </div>

      {/* Untere Navigation */}
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
                  className={`p-1 rounded-full ${
                    currentPage === item.name
                      ? 'bg-greenLight text-dark'
                      : 'bg-transparent'
                  } transition-transform duration-200 ${
                    currentPage === item.name ? 'scale-110' : ''
                  }`}
                  style={{ fontSize: '2.5em' }}
                >
                  {item.icon}
                </div>
                {/* Optional: Labels anzeigen */}
                {/* <span className="text-xs mt-1">{item.label}</span> */}
              </div>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default memo(Navbar);
