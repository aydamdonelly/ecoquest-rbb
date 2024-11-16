// src/pages/Profile.js

import React, { useState } from 'react';
import SDGs from '../data/sdgs';
import { FaEnvelope, FaCog, FaSignOutAlt, FaPlus, FaMinus } from 'react-icons/fa';

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
      acc[area.id] = 0;
      return acc;
    }, {})
  );
  const [remainingPoints, setRemainingPoints] = useState(10);

  const handleSDGSelection = (id) => {
    setSelectedSDGs((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((sdgId) => sdgId !== id)
        : [...prevSelected, id]
    );
  };

  const handleKnowledgeIncrement = (id) => {
    if (remainingPoints > 0) {
      setKnowledgeLevels((prevLevels) => ({
        ...prevLevels,
        [id]: prevLevels[id] + 1,
      }));
      setRemainingPoints(remainingPoints - 1);
    }
  };

  const handleKnowledgeDecrement = (id) => {
    if (knowledgeLevels[id] > 0) {
      setKnowledgeLevels((prevLevels) => ({
        ...prevLevels,
        [id]: prevLevels[id] - 1,
      }));
      setRemainingPoints(remainingPoints + 1);
    }
  };

  return (
    <div className="p-5 text-cream font-sans bg-dark min-h-screen mt-8"> {/* Margin oben erhöht */}
      <div className="flex flex-col items-center">
        <img
          src="/images/profile-picture.jpg"
          alt="Profilbild"
          className="w-40 h-40 rounded-full mb-4"
        />
        <h1 className="text-4xl font-bold mb-1">Adam Kahirov</h1>
        <p className="text-lg text-gray-400 mb-4">@aydamdonelly</p>

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
              <span className="text-xl">adamkahirov@web.de</span>
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

        {/* SDG-Auswahl */}
        <h2 className="text-2xl font-semibold mt-8 mb-3">Wähle deine SDGs:</h2>
        <div className="w-full overflow-x-auto">
          <div className="flex space-x-4">
            {SDGs.map((sdg) => (
              <img
                key={sdg.id}
                src={`/images/sdgs/sdg${sdg.id}.png`}
                alt={sdg.name}
                className={`w-24 h-24 cursor-pointer ${
                  selectedSDGs.includes(sdg.id) ? 'opacity-100' : 'opacity-50'
                }`}
                onClick={() => handleSDGSelection(sdg.id)}
              />
            ))}
          </div>
        </div>

        {/* Wissensprofil */}
        <h2 className="text-2xl font-semibold mt-8 mb-3">Dein Wissensprofil:</h2>
        <p className="mb-4">Verbleibende Punkte: {remainingPoints}</p>
        <div className="w-full max-w-md">
          {knowledgeAreas.map((area) => (
          <div key={area.id} className="mb-6">
            <label className="block text-lg mb-2">{area.label}</label>
            <div className="flex items-center">
              <button
                onClick={() => handleKnowledgeDecrement(area.id)}
                className="px-2 py-1 bg-gray-600 text-cream rounded hover:bg-gray-500 mr-2"
                disabled={knowledgeLevels[area.id] === 0} // Hier die Änderung
              >
                <FaMinus />
              </button>
              <span className="text-xl mx-2">{knowledgeLevels[area.id]}</span>
              <button
                onClick={() => handleKnowledgeIncrement(area.id)}
                className="px-2 py-1 bg-greenLight text-dark rounded hover:bg-greenDark ml-2"
                disabled={remainingPoints === 0}
              >
                <FaPlus />
              </button>
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
