// src/components/CO2ProgressBar.js

import React from 'react';
import { useSpring, animated } from 'react-spring';

function CO2ProgressBar({ totalCO2Saved }) {
  const maxCO2 = 10000; // The target CO₂ saving goal
  const percentage = (totalCO2Saved / maxCO2) * 100;

  // Clamp percentage between 0 and 100
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100);

  // Animation for the progress bar width
  const props = useSpring({
    width: `${clampedPercentage}%`,
    config: { duration: 1000 },
  });

  // Animation for the CO₂ saved number
  const numberProps = useSpring({
    number: totalCO2Saved,
    from: { number: 0 },
    config: { duration: 1000 },
  });

  return (
    <div className="relative w-full bg-gray-300 h-8">
      <animated.div className="bg-greenLight h-8" style={props} />
      <div className="absolute inset-0 flex items-center justify-center">
        <animated.span className="text-cream font-bold">
          {numberProps.number.to((n) => `${Math.floor(n)} kg CO₂ saved`)}
        </animated.span>
      </div>
    </div>
  );
}

export default CO2ProgressBar;
