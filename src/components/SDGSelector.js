// src/components/SDGSelector.js

import React, { useState } from 'react';
import './SDGSelector.css';
import SDGItem from './SDGItem';
import SDGs from '../data/sdgs';

function SDGSelector({ onSelectionChange }) {
  const [selectedSDGs, setSelectedSDGs] = useState([]);

  const toggleSDG = (id) => {
    const updatedSelection = selectedSDGs.includes(id)
      ? selectedSDGs.filter((sdg) => sdg !== id)
      : [...selectedSDGs, id];
    setSelectedSDGs(updatedSelection);
    if (onSelectionChange) {
      onSelectionChange(updatedSelection);
    }
  };

  return (
    <div className="sdg-selector">
      {SDGs.map((sdg) => (
        <SDGItem 
          key={sdg.id} 
          sdg={sdg} 
          isSelected={selectedSDGs.includes(sdg.id)} 
          toggleSDG={toggleSDG} 
        />
      ))}
    </div>
  );
}

export default SDGSelector;
