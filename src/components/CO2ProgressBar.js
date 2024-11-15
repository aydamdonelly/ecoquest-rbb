// src/components/CO2ProgressBar.js

import React from 'react';
import { useSpring, animated } from 'react-spring';

function CO2ProgressBar({ totalCO2Saved }) {
  const maxCO2 = 1000000; // The target CO₂ saving goal

  // Calculate percentage progress
  const percentage = (totalCO2Saved / maxCO2) * 100;

  // Clamp percentage between 0 and 100
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100);

  // Animation for the progress bar width
  const progressBarAnimation = useSpring({
    width: `${clampedPercentage}%`,
    config: { duration: 1000 },
  });

  // Animation for the CO₂ saved number
  const numberAnimation = useSpring({
    number: totalCO2Saved,
    config: { duration: 1000 },
  });

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 w-11/12 max-w-md bg-dark rounded-full overflow-hidden shadow-lg">
      <div className="relative w-full h-8">
        <animated.div
          className="h-8 bg-greenLight"
          style={{
            ...progressBarAnimation,
            boxShadow: '0 0 10px rgba(0, 255, 0, 0.7)',
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <animated.span className="text-cream font-bold">
            {numberAnimation.number.to((n) => `${Math.floor(n)} kg CO₂ saved`)}
          </animated.span>
        </div>
      </div>
    </div>
  );
}

export default CO2ProgressBar;
