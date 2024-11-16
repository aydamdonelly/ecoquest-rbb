// src/components/CO2ProgressBar.js

import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

function CO2ProgressBar() {
  const maxCO2 = 1000000; // The goal for CO₂ saved
  const [totalCO2Saved, setTotalCO2Saved] = useState(325590);

  // Simulate the total CO₂ saved increasing slowly towards 1,000,000
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
    }, 1000); // every second
    return () => clearInterval(interval);
  }, [maxCO2]);

  // Calculate the progress percentage
  const percentage = (totalCO2Saved / maxCO2) * 100;

  // Clamp the value between 0 and 100
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100);

  // Animation for the progress bar width
  const progressBarAnimation = useSpring({
    width: `${clampedPercentage}%`,
    config: { duration: 1000 },
  });

  // Animation for the displayed CO₂ saved
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

export default React.memo(CO2ProgressBar);
