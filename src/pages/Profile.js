// src/pages/Profile.js

import React, { useState } from 'react';
import SDGSelector from '../components/SDGSelector';
import SDGs from '../data/sdgs';

function Profile() {
  const [selectedSDGs, setSelectedSDGs] = useState([]);

  const handleSDGSelection = (selected) => {
    setSelectedSDGs(selected);
  };

  return (
    <div className="p-5 text-cream font-sans">
      <h1 className="text-3xl font-bold mb-5">Profil</h1>
      <SDGSelector onSelectionChange={handleSDGSelection} />
      <div className="mt-5">
        <h2 className="text-2xl font-semibold mb-3">Ausgewählte SDGs:</h2>
        <ul className="flex flex-wrap">
          {selectedSDGs.map((id) => {
            const sdg = SDGs.find((sdg) => sdg.id === id);
            return (
              <li
                key={id}
                className="bg-greenLight text-dark px-3 py-1 rounded-full mr-2 mb-2"
              >
                {sdg ? sdg.name : 'SDG'}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Profile;
