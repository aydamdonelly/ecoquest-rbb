// src/components/CO2ProgressBar.js

import React from 'react';
import { useSpring, animated } from 'react-spring';

function CO2ProgressBar({ totalCO2Saved }) {
  const maxCO2 = 1000000; // Das Ziel für eingespartes CO₂

  // Berechne den Fortschritt in Prozent
  const percentage = (totalCO2Saved / maxCO2) * 100;

  // Begrenze den Wert zwischen 0 und 100
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100);

  // Animation für die Breite der Fortschrittsleiste
  const progressBarAnimation = useSpring({
    width: `${clampedPercentage}%`,
    config: { duration: 1000 },
  });

  // Animation für die angezeigte CO₂-Einsparung
  const numberAnimation = useSpring({
    number: totalCO2Saved,
    config: { duration: 1000 },
  });

  return (
    <div className="w-full">
      <div className="relative w-full bg-dark rounded-full overflow-hidden shadow-lg h-2">
        <animated.div
          className="h-2 bg-greenLight"
          style={{
            ...progressBarAnimation,
            boxShadow: '0 0 10px rgba(0, 255, 0, 0.7)',
          }}
        />
      </div>
      <animated.div className="mt-1 text-center text-cream font-bold text-xs">
        {numberAnimation.number.to((n) => `${Math.floor(n)} kg CO₂ eingespart`)}
      </animated.div>
    </div>
  );
}

export default CO2ProgressBar;
