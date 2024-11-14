import React, { useState } from 'react';
import SDGSelector from '../components/SDGSelector';
import SDGs from '../data/sdgs';

function Profile() {
  const [selectedSDGs, setSelectedSDGs] = useState([]);

  const handleSDGSelection = (selected) => {
    setSelectedSDGs(selected);
    // Weitere Profilinformationen basierend auf den ausgewählten SDGs aktualisieren
  };

  return (
    <div className="profile-page p-8 text-darkTeal dark:text-white min-h-screen pt-16">
      <h1 className="text-3xl font-bold mb-6">Profil</h1>
      <SDGSelector onSelectionChange={handleSDGSelection} />
      <div className="selected-sdgs mt-6">
        <h2 className="text-2xl font-semibold mb-2">Ausgewählte SDGs:</h2>
        <ul className="flex flex-wrap gap-2">
          {selectedSDGs.map((id) => {
            const sdg = SDGs.find((sdg) => sdg.id === id);
            return (
              <li 
                key={id} 
                className="px-3 py-1 bg-buttonGreen text-gray-800 rounded-full shadow-lg"
              >
                {sdg ? sdg.name : 'SDG'}
              </li>
            );
          })}
        </ul>
      </div>
      {/* Weitere Profilinformationen hier */}
    </div>
  );
}

export default Profile;
