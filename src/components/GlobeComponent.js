import React, { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';
import { animated, useSpring } from 'react-spring';
import SDGs from '../data/sdgs';

function GlobeComponent() {
  const globeEl = useRef();
  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    globeEl.current.pointOfView({ lat: 0, lng: 0, altitude: 2 }, 1000);
  }, []);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  const handleClose = () => {
    setSelectedMarker(null);
  };

  // Animation für die Info-Box
  const animationProps = useSpring({
    opacity: selectedMarker ? 1 : 0,
    transform: selectedMarker ? `translateY(0%)` : `translateY(-20%)`,
    config: { tension: 200, friction: 20 },
  });

  return (
    <div className="relative w-full h-full flex justify-center items-center">
      <Globe
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        backgroundColor="#1f4748"
        pointsData={SDGs}
        pointLat={(d) => d.coordinates[1]}
        pointLng={(d) => d.coordinates[0]}
        pointAltitude={0.02} // Größere Markierungen
        pointRadius={0.5}
        pointColor={() => '#a4c465'}
        onPointClick={handleMarkerClick}
        enablePointerInteraction
      />
      {selectedMarker && (
        <animated.div style={animationProps} className="absolute top-20 bg-gray-800 bg-opacity-90 p-6 rounded-lg shadow-lg flex flex-col items-center">
          <h3 className="text-xl font-bold text-buttonGreen mb-4">{selectedMarker.name}</h3>
          <button 
            onClick={() => alert('Quiz kommt bald!')} 
            className="mb-2 px-4 py-2 bg-buttonGreen text-gray-800 rounded hover:bg-green-600 transition-colors duration-300"
          >
            Quiz
          </button>
          <button 
            onClick={() => alert('Lerneinheit kommt bald!')} 
            className="mb-2 px-4 py-2 bg-buttonGreen text-gray-800 rounded hover:bg-green-600 transition-colors duration-300"
          >
            Lerneinheit
          </button>
          <button 
            onClick={handleClose} 
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition-colors duration-300"
          >
            Schließen
          </button>
        </animated.div>
      )}
    </div>
  );
}

export default GlobeComponent;
