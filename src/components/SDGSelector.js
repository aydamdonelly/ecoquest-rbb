import React, { useState } from 'react';
import './SDGSelector.css';
import { useSpring, animated } from 'react-spring';

// Beispielhafte SDG-Daten
const SDGs = [
  { id: 1, name: 'Keine Armut', color: '#E5243B' },
  { id: 2, name: 'Kein Hunger', color: '#DDA63A' },
  { id: 3, name: 'Gesundheit und Wohlergehen', color: '#4C9F38' },
  { id: 4, name: 'Hochwertige Bildung', color: '#C5192D' },
  { id: 5, name: 'Geschlechtergleichheit', color: '#FF3A21' },
  { id: 6, name: 'Sauberes Wasser und Sanitäreinrichtungen', color: '#26BDE2' },
  { id: 7, name: 'Bezahlbare und saubere Energie', color: '#FCC30B' },
  { id: 8, name: 'Menschenwürdige Arbeit und Wirtschaftswachstum', color: '#A21942' },
  { id: 9, name: 'Industrie, Innovation und Infrastruktur', color: '#FD6925' },
  { id: 10, name: 'Weniger Ungleichheiten', color: '#DD1367' },
  { id: 11, name: 'Nachhaltige Städte und Gemeinden', color: '#FD9D24' },
  { id: 12, name: 'Nachhaltiger Konsum und Produktion', color: '#BF8B2E' },
  { id: 13, name: 'Maßnahmen zum Klimaschutz', color: '#3F7E44' },
  { id: 14, name: 'Leben unter Wasser', color: '#0A97D9' },
  { id: 15, name: 'Leben an Land', color: '#56C02B' },
  { id: 16, name: 'Frieden, Gerechtigkeit und starke Institutionen', color: '#00689D' },
  { id: 17, name: 'Partnerschaften zur Erreichung der Ziele', color: '#19486A' },
];

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
      {SDGs.map((sdg) => {
        const isSelected = selectedSDGs.includes(sdg.id);
        const animation = useSpring({
          transform: isSelected ? 'scale(1.1)' : 'scale(1)',
          boxShadow: isSelected 
            ? '0px 4px 10px rgba(0, 0, 0, 0.3)' 
            : '0px 0px 0px rgba(0, 0, 0, 0)',
        });

        return (
          <animated.div 
            key={sdg.id} 
            className={`sdg-item ${isSelected ? 'selected' : ''}`} 
            style={{ 
              backgroundColor: sdg.color, 
              ...animation 
            }}
            onClick={() => toggleSDG(sdg.id)}
          >
            {sdg.id}. {sdg.name}
          </animated.div>
        );
      })}
    </div>
  );
}

export default SDGSelector;
