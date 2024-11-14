import React from 'react';
import { useSpring, animated } from 'react-spring';

function SDGItem({ sdg, isSelected, toggleSDG }) {
  const animation = useSpring({
    transform: isSelected ? 'scale(1.1)' : 'scale(1)',
    boxShadow: isSelected 
      ? '0px 4px 15px rgba(164, 196, 101, 0.6)' 
      : '0px 0px 0px rgba(0, 0, 0, 0)',
    config: { tension: 200, friction: 20 },
  });

  return (
    <animated.div 
      className={`sdg-item cursor-pointer text-center rounded-lg p-4 transition-transform duration-300`}
      style={{ 
        backgroundColor: sdg.color, 
        ...animation 
      }}
      onClick={() => toggleSDG(sdg.id)}
    >
      <span className="font-black">{sdg.id}. {sdg.name}</span>
    </animated.div>
  );
}

export default SDGItem;
