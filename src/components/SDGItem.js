// src/components/SDGItem.js

import React from 'react';
import { useSpring, animated } from 'react-spring';

function SDGItem({ sdg, isSelected, toggleSDG }) {
  const animation = useSpring({
    transform: isSelected ? 'scale(1.05)' : 'scale(1)',
    boxShadow: isSelected
      ? '0px 4px 10px rgba(0, 0, 0, 0.3)'
      : '0px 0px 0px rgba(0, 0, 0, 0)',
    config: { tension: 200, friction: 20 },
  });

  return (
    <animated.div
      className={`p-4 rounded-lg text-dark font-bold text-center cursor-pointer`}
      style={{
        backgroundColor: sdg.color,
        ...animation,
        opacity: isSelected ? 1 : 0.8,
      }}
      onClick={() => toggleSDG(sdg.id)}
    >
      {sdg.id}. {sdg.name}
    </animated.div>
  );
}

export default SDGItem;
