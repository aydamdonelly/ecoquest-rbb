// src/pages/Profile.js

import React, { useState } from 'react';
import SDGs from '../data/sdgs';
import { useSpring, animated } from 'react-spring';
import { FaEnvelope, FaCog, FaSignOutAlt } from 'react-icons/fa';

function Profile() {
  const [selectedSDGs, setSelectedSDGs] = useState([]);

  const handleSDGSelection = (id) => {
    setSelectedSDGs((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((sdgId) => sdgId !== id)
        : [...prevSelected, id]
    );
  };

  return (
    <div className="p-5 text-cream font-sans bg-dark min-h-screen">
      <div className="flex flex-col items-center">
        <img
          src="/images/profile-picture.jpg"
          alt="Profilbild"
          className="w-32 h-32 rounded-full mb-4"
        />
        <h1 className="text-3xl font-bold mb-1">Dein Name</h1>
        <p className="text-sm text-gray-400 mb-4">@benutzername</p>

        {/* Anzeige der ausgewählten SDGs unter dem Namen */}
        <div className="flex space-x-2 mb-5">
          {selectedSDGs.slice(0, 3).map((id) => {
            const sdg = SDGs.find((sdg) => sdg.id === id);
            return (
              <img
                key={id}
                src={`/images/sdgs/sdg${id}.png`}
                alt={sdg ? sdg.name : 'SDG'}
                className="w-8 h-8"
              />
            );
          })}
        </div>

        {/* Profil-Details */}
        <div className="w-full max-w-md">
          <div className="bg-darkLighter p-4 rounded-lg mb-4">
            <div className="flex items-center">
              <FaEnvelope className="text-greenLight mr-2" />
              <span className="text-lg">email@example.com</span>
            </div>
          </div>
          <div className="bg-darkLighter p-4 rounded-lg mb-4">
            <div className="flex items-center">
              <FaCog className="text-greenLight mr-2" />
              <span className="text-lg">Einstellungen</span>
            </div>
          </div>
          <div className="bg-darkLighter p-4 rounded-lg">
            <div className="flex items-center">
              <FaSignOutAlt className="text-greenLight mr-2" />
              <span className="text-lg">Abmelden</span>
            </div>
          </div>
        </div>

        {/* SDG-Auswahl - Kleiner Teil */}
        <h2 className="text-2xl font-semibold mt-8 mb-3">Wähle deine SDGs:</h2>
        <div className="w-full overflow-x-auto">
          <div className="flex space-x-4">
            {SDGs.map((sdg) => {
              const isSelected = selectedSDGs.includes(sdg.id);
              const animation = useSpring({
                transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                boxShadow: isSelected
                  ? '0px 0px 10px rgba(164, 196, 101, 0.7)'
                  : '0px 0px 0px rgba(0, 0, 0, 0)',
              });
              return (
                <animated.img
                  key={sdg.id}
                  src={`/images/sdgs/sdg${sdg.id}.png`}
                  alt={sdg.name}
                  className="w-16 h-16 cursor-pointer"
                  style={animation}
                  onClick={() => handleSDGSelection(sdg.id)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
