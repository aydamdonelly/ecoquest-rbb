// src/components/GlobeComponent.js

import React, { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';
import { animated, useSpring } from 'react-spring';
import * as THREE from 'three';

const disasterMarkers = [
  { id: 1, name: 'Waldbrand Kalifornien', coordinates: [-119.4179, 36.7783] },
  // ... weitere Marker
];

function GlobeComponent() {
  const globeEl = useRef();
  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    globeEl.current.pointOfView({ lat: 0, lng: 0, altitude: 2 });
  }, []);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  const handleClose = () => {
    setSelectedMarker(null);
  };

  const animationProps = useSpring({
    opacity: selectedMarker ? 1 : 0,
    transform: selectedMarker ? `translateY(0%)` : `translateY(20%)`,
    config: { tension: 200, friction: 20 },
  });

  const pinMaterial = new THREE.MeshLambertMaterial({
    color: '#F6FCDF',
    emissive: '#859F3D',
    emissiveIntensity: 0.5,
  });

  return (
    <div className="relative w-full h-screen">
      <Globe
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        backgroundColor="rgba(0,0,0,0)"
        pointsData={disasterMarkers}
        pointLat={(d) => d.coordinates[1]}
        pointLng={(d) => d.coordinates[0]}
        pointAltitude={0}
        pointRadius={0.2}
        pointColor={() => '#859F3D'}
        pointMaterial={pinMaterial}
        onPointClick={handleMarkerClick}
        animateIn={true}
      />
      {selectedMarker && (
        <animated.div
          style={animationProps}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-dark bg-opacity-80 text-cream p-5 rounded-lg shadow-lg"
        >
          <h3 className="text-xl font-bold mb-2">{selectedMarker.name}</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => alert('Quiz kommt bald!')}
              className="px-4 py-2 bg-greenLight text-dark rounded hover:bg-greenDark"
            >
              Quiz
            </button>
            <button
              onClick={() => alert('Lerneinheit kommt bald!')}
              className="px-4 py-2 bg-greenLight text-dark rounded hover:bg-greenDark"
            >
              Lerneinheit
            </button>
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-red-600 text-dark rounded hover:bg-red-800"
            >
              X
            </button>
          </div>
        </animated.div>
      )}
    </div>
  );
}

export default GlobeComponent;
