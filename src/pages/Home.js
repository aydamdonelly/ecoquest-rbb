// src/pages/Home.js

import React from 'react';
import GlobeComponent from '../components/GlobeComponent';
import CO2ProgressBar from '../components/CO2ProgressBar';

function Home() {
  return (
    <div className="flex-1 flex flex-col items-center relative">
      {/* Progress Bar positioned higher */}
      <div className="w-full absolute top-[10vh] px-4">
        <CO2ProgressBar />
      </div>
      {/* Globe */}
      <div className="flex-1 flex justify-center items-center">
        <GlobeComponent />
      </div>
    </div>
  );
}

export default Home;
