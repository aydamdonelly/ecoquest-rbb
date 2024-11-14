import React, { useState } from 'react';
import SDGSelector from '../components/SDGSelector';
import './Profile.css';

function Profile() {
  const [selectedSDGs, setSelectedSDGs] = useState([]);

  const handleSDGSelection = (selected) => {
    setSelectedSDGs(selected);
    // Hier kannst du weitere Profilinformationen basierend auf den ausgewählten SDGs aktualisieren
  };

  return (
    <div className="profile-page">
      <h1>Profil</h1>
      <SDGSelector onSelectionChange={handleSDGSelection} />
      <div className="selected-sdgs">
        <h2>Ausgewählte SDGs:</h2>
        <ul>
          {selectedSDGs.map((id) => {
            const sdg = SDGs.find((sdg) => sdg.id === id);
            return <li key={id}>{sdg ? sdg.name : 'SDG'}</li>;
          })}
        </ul>
      </div>
      {/* Weitere Profilinformationen hier */}
    </div>
  );
}

export default Profile;
