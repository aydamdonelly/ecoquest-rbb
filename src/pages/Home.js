// src/pages/Home.js

import React from 'react';
import GlobeComponent from '../components/GlobeComponent';
// CO2ProgressBar-Import entfernt

function Home() {
  return (
    <div className="flex-1 flex flex-col items-center relative">
      {/* Fortschrittsbalken entfernt, da er jetzt in Navbar.js eingebunden ist */}
      {/* Globus */}
      <div className="flex-1 flex justify-center items-center z-10">
        <GlobeComponent />
      </div>
    </div>
  );
}

export default Home;
