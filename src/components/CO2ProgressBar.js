// src/components/CO2ProgressBar.js

import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

function CO2ProgressBar() {
  const maxCO2 = 1000000; // Ziel für eingespartes CO₂
  const [totalCO2Saved, setTotalCO2Saved] = useState(325590);

  // Simuliere eine langsame Erhöhung der eingesparten CO₂-Menge in Richtung 1.000.000
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalCO2Saved((prevTotal) => {
        if (prevTotal >= maxCO2) {
          clearInterval(interval);
          return maxCO2;
        }
        const remaining = maxCO2 - prevTotal;
        const increment = Math.max(1, Math.floor(remaining * 0.0005));
        return prevTotal + increment;
      });
    }, 1000); // alle Sekunde
    return () => clearInterval(interval);
  }, [maxCO2]);

  // Berechne den Fortschrittsprozentsatz
  const percentage = (totalCO2Saved / maxCO2) * 100;

  // Beschränke den Wert zwischen 0 und 100
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100);

  // Animation für die Breite der Fortschrittsanzeige
  const progressBarAnimation = useSpring({
    width: `${clampedPercentage}%`,
    config: { duration: 1000 },
  });

  // Animation für die angezeigte eingesparte CO₂-Menge
  const numberAnimation = useSpring({
    number: totalCO2Saved,
    config: { duration: 1000 },
  });

  return (
    <div className="w-full">
      <div className="relative w-full bg-dark rounded-full overflow-hidden shadow-lg h-8">
        <animated.div
          className="h-8 bg-greenLight"
          style={{
            ...progressBarAnimation,
            boxShadow: '0 0 10px rgba(0, 255, 0, 0.7)',
          }}
        />
      </div>
      <animated.div className="mt-2 text-center text-cream font-bold text-lg px-2">
        {numberAnimation.number.to((n) =>
          `Im November 2024 von der ecoQuest-Community gespart: ${Math.floor(n)} kg CO₂`
        )}
      </animated.div>
    </div>
  );
}

export default React.memo(CO2ProgressBar);
