// src/components/Navbar.js

import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { FaHome, FaTasks, FaChartLine, FaUser, FaLeaf } from 'react-icons/fa';

function Navbar({ currentPage, setCurrentPage, userCredits }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigation = (page) => {
    setCurrentPage(page);
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div className="flex items-center justify-between px-4 py-3">
        <button onClick={() => setIsOpen(!isOpen)} className="text-cream focus:outline-none">
          {isOpen ? (
            <XMarkIcon className="h-14 w-14 text-cream" />
          ) : (
            <Bars3Icon className="h-14 w-14 text-cream" />
          )}
        </button>
        <h1 className="text-5xl font-bold text-cream">ecoQuest</h1>
        {/* Credits Counter */}
        <div className="flex items-center bg-greenDark rounded-full px-4 py-2">
          <FaLeaf className="h-6 w-6 text-cream" />
          <span className="ml-2 text-xl text-cream font-bold">{userCredits}</span>
        </div>
      </div>
      <Transition
        show={isOpen}
        enter="transition ease-out duration-300 transform"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in duration-200 transform"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
        className="fixed top-0 left-0 h-full w-full z-40"
      >
        <div className="bg-dark bg-opacity-80 backdrop-blur h-full shadow-lg relative">
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-cream focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 transform rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div className="mt-20">
            <nav className="flex flex-col space-y-6">
              <button
                onClick={() => handleNavigation('home')}
                className="flex items-center px-6 py-4 text-2xl text-cream hover:bg-greenDark hover:bg-opacity-50 transition-colors duration-200"
              >
                <FaHome className="mr-4 h-8 w-8" />
                Home
              </button>
              <button
                onClick={() => handleNavigation('challenges')}
                className="flex items-center px-6 py-4 text-2xl text-cream hover:bg-greenDark hover:bg-opacity-50 transition-colors duration-200"
              >
                <FaTasks className="mr-4 h-8 w-8" />
                Challenges
              </button>
              <button
                onClick={() => handleNavigation('impact')}
                className="flex items-center px-6 py-4 text-2xl text-cream hover:bg-greenDark hover:bg-opacity-50 transition-colors duration-200"
              >
                <FaChartLine className="mr-4 h-8 w-8" />
                Impact
              </button>
              <button
                onClick={() => handleNavigation('profile')}
                className="flex items-center px-6 py-4 text-2xl text-cream hover:bg-greenDark hover:bg-opacity-50 transition-colors duration-200"
              >
                <FaUser className="mr-4 h-8 w-8" />
                Profil
              </button>
            </nav>
          </div>
        </div>
      </Transition>
    </nav>
  );
}

export default Navbar;
