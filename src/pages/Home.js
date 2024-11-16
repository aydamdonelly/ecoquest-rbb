// src/pages/Home.js

import React from 'react';
import GlobeComponent from '../components/GlobeComponent';
import CO2ProgressBar from '../components/CO2ProgressBar';

function Home() {
  return (
    <div className="flex-1 flex flex-col items-center relative">
      {/* Fortschrittsbalken direkt unter "ecoQuest" */}
      <div className="w-full mt-4 px-4">
        <CO2ProgressBar />
      </div>
      {/* Globus */}
      <div className="flex-1 flex justify-center items-center z-10">
        <GlobeComponent />
      </div>
    </div>
  );
}

export default Home;
