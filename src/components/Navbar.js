// src/components/Navbar.js

import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { FaHome, FaTasks, FaChartLine, FaUser } from 'react-icons/fa';

function Navbar({ currentPage, setCurrentPage }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigation = (page) => {
    setCurrentPage(page);
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div className="flex items-center justify-between px-4 py-3">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-cream focus:outline-none"
        >
          {isOpen ? (
            <XMarkIcon className="h-8 w-8 text-cream" />
          ) : (
            <Bars3Icon className="h-8 w-8 text-cream" />
          )}
        </button>
        <h1 className="text-3xl font-bold text-cream">ecoQuest</h1>
      </div>
      <Transition
        show={isOpen}
        enter="transition ease-out duration-300 transform"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in duration-200 transform"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
        className="fixed top-0 left-0 h-full w-64 z-40"
      >
        <div className="bg-dark bg-opacity-80 backdrop-blur h-full shadow-lg">
          <div className="mt-16">
            <nav className="flex flex-col space-y-4">
              <button
                onClick={() => handleNavigation('home')}
                className="flex items-center px-4 py-2 text-cream hover:bg-greenDark hover:bg-opacity-50"
              >
                <FaHome className="mr-3" />
                Home
              </button>
              <button
                onClick={() => handleNavigation('challenges')}
                className="flex items-center px-4 py-2 text-cream hover:bg-greenDark hover:bg-opacity-50"
              >
                <FaTasks className="mr-3" />
                Challenges
              </button>
              <button
                onClick={() => handleNavigation('impact')}
                className="flex items-center px-4 py-2 text-cream hover:bg-greenDark hover:bg-opacity-50"
              >
                <FaChartLine className="mr-3" />
                Impact
              </button>
              <button
                onClick={() => handleNavigation('profile')}
                className="flex items-center px-4 py-2 text-cream hover:bg-greenDark hover:bg-opacity-50"
              >
                <FaUser className="mr-3" />
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
