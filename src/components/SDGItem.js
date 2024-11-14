import React from 'react';
import { useSpring, animated } from 'react-spring';
import './SDGItem.css';

function SDGItem({ sdg, isSelected, toggleSDG }) {
  const animation = useSpring({
    transform: isSelected ? 'scale(1.1)' : 'scale(1)',
    boxShadow: isSelected 
      ? '0px 4px 10px rgba(0, 0, 0, 0.3)' 
      : '0px 0px 0px rgba(0, 0, 0, 0)',
    config: { tension: 200, friction: 20 },
  });

  return (
    <animated.div 
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
}

export default SDGItem;
