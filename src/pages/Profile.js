// src/pages/Profile.js

import React, { useState } from 'react';
import SDGs from '../data/sdgs';
import { useSprings, animated } from 'react-spring';
import { FaEnvelope, FaCog, FaSignOutAlt } from 'react-icons/fa';

const knowledgeAreas = [
  { id: 1, label: 'Klimawandel' },
  { id: 2, label: 'Erneuerbare Energien' },
  { id: 3, label: 'Nachhaltige Landwirtschaft' },
  { id: 4, label: 'Umweltpolitik' },
];

function Profile() {
  const [selectedSDGs, setSelectedSDGs] = useState([]);
  const [knowledgeLevels, setKnowledgeLevels] = useState(
    knowledgeAreas.reduce((acc, area) => {
      acc[area.id] = 50;
      return acc;
    }, {})
  );

  const handleSDGSelection = (id) => {
    setSelectedSDGs((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((sdgId) => sdgId !== id)
        : [...prevSelected, id]
    );
  };

  const handleKnowledgeChange = (id, value) => {
    setKnowledgeLevels((prevLevels) => ({
      ...prevLevels,
      [id]: value,
    }));
  };

  const springs = useSprings(
    SDGs.length,
    SDGs.map((sdg) => {
      const isSelected = selectedSDGs.includes(sdg.id);
      return {
        transform: isSelected ? 'scale(1.1)' : 'scale(1)',
        boxShadow: isSelected
          ? '0px 0px 15px rgba(164, 196, 101, 0.7)'
          : '0px 0px 0px rgba(0, 0, 0, 0)',
      };
    })
  );

  return (
    <div className="p-5 text-cream font-sans bg-dark min-h-screen">
      <div className="flex flex-col items-center">
        <img
          src="/images/profile-picture.jpg"
          alt="Profilbild"
          className="w-40 h-40 rounded-full mb-4"
        />
        <h1 className="text-4xl font-bold mb-1">Dein Name</h1>
        <p className="text-lg text-gray-400 mb-4">@benutzername</p>

        {/* Anzeige der ausgewählten SDGs unter dem Namen */}
        <div className="flex space-x-2 mb-5">
          {selectedSDGs.slice(0, 3).map((id) => {
            const sdg = SDGs.find((sdg) => sdg.id === id);
            return (
              <img
                key={id}
                src={`/images/sdgs/sdg${sdg.id}.png`}
                alt={sdg ? sdg.name : 'SDG'}
                className="w-10 h-10"
              />
            );
          })}
        </div>

        {/* Profil-Details */}
        <div className="w-full max-w-md">
          <div className="bg-darkLighter p-4 rounded-lg mb-4">
            <div className="flex items-center">
              <FaEnvelope className="text-greenLight mr-2" />
              <span className="text-xl">email@example.com</span>
            </div>
          </div>
          <div className="bg-darkLighter p-4 rounded-lg mb-4">
            <div className="flex items-center">
              <FaCog className="text-greenLight mr-2" />
              <span className="text-xl">Einstellungen</span>
            </div>
          </div>
          <div className="bg-darkLighter p-4 rounded-lg">
            <div className="flex items-center">
              <FaSignOutAlt className="text-greenLight mr-2" />
              <span className="text-xl">Abmelden</span>
            </div>
          </div>
        </div>

        {/* SDG-Auswahl - Kleiner Teil */}
        <h2 className="text-2xl font-semibold mt-8 mb-3">Wähle deine SDGs:</h2>
        <div className="w-full overflow-x-auto">
          <div className="flex space-x-4">
            {springs.map((animation, index) => {
              const sdg = SDGs[index];
              return (
                <animated.img
                  key={sdg.id}
                  src={`/images/sdgs/sdg${sdg.id}.png`}
                  alt={sdg.name}
                  className="w-24 h-24 cursor-pointer"
                  style={animation}
                  onClick={() => handleSDGSelection(sdg.id)}
                />
              );
            })}
          </div>
        </div>

        {/* Wissensprofil */}
        <h2 className="text-2xl font-semibold mt-8 mb-3">Dein Wissensprofil:</h2>
        <div className="w-full max-w-md">
          {knowledgeAreas.map((area) => (
            <div key={area.id} className="mb-4">
              <label className="block text-lg mb-2">{area.label}</label>
              <input
                type="range"
                min="0"
                max="100"
                value={knowledgeLevels[area.id]}
                onChange={(e) => handleKnowledgeChange(area.id, e.target.value)}
                className="w-full"
              />
              <div className="text-right">{knowledgeLevels[area.id]}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
