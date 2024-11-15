// src/components/GlobeComponent.js

import React, { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';
import { animated, useSpring } from 'react-spring';
import * as THREE from 'three';

const disasterMarkers = [
  { id: 1, name: 'Waldbrand Kalifornien', coordinates: [-119.4179, 36.7783] },
  { id: 2, name: 'Flut Valencia', coordinates: [-0.3763, 39.4699] },
  { id: 3, name: 'Hurrikan Milton', coordinates: [-70.8333, 24.5] },
  { id: 4, name: 'Überschwemmung Bangladesch', coordinates: [90.3563, 23.6850] },
  { id: 5, name: 'Erdbeben Japan', coordinates: [138.2529, 36.2048] },
  // Weitere Katastrophen hinzufügen
];


function GlobeComponent() {
  const globeEl = useRef();
  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    globeEl.current.pointOfView({ lat: 0, lng: 0, altitude: 2 }, 0);
  }, []);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  const handleClose = () => {
    setSelectedMarker(null);
  };

  const animationProps = useSpring({
    bottom: selectedMarker ? 0 : -300,
    opacity: selectedMarker ? 1 : 0,
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
        globeImageUrl="https://unpkg.com/three-globe@2.34.4/example/img/earth-dark.jpg"
        backgroundColor="rgba(0,0,0,0)"
        pointsData={disasterMarkers}
        pointLat={(d) => d.coordinates[1]}
        pointLng={(d) => d.coordinates[0]}
        pointAltitude={0.01}
        pointRadius={0.5} // Größere Pinpoints
        pointLabel={(d) => d.name}
        pointClassName={() => 'pulse'} // Klasse hinzufügen
        pointColor={() => '#859F3D'}
        pointMaterial={pinMaterial}
        onPointClick={handleMarkerClick}
        animateIn={true}
      />
      {selectedMarker && (
        <animated.div
          style={animationProps}
          className="absolute left-0 right-0 bottom-0 bg-dark bg-opacity-90 text-cream p-5 rounded-t-lg shadow-lg"
        >
          <h3 className="text-xl font-bold mb-2">{selectedMarker.name}</h3>
          <div className="flex justify-around">
            <button
              onClick={() => alert('Mehr Informationen kommen bald!')}
              className="px-4 py-2 bg-greenLight text-dark rounded hover:bg-greenDark"
            >
              Informieren
            </button>
            <button
              onClick={() => alert('Quiz kommt bald!')}
              className="px-4 py-2 bg-greenLight text-dark rounded hover:bg-greenDark"
            >
              Quiz
            </button>
            <button
              onClick={() => alert('Spenden kommt bald!')}
              className="px-4 py-2 bg-greenLight text-dark rounded hover:bg-greenDark"
            >
              Spenden
            </button>
          </div>
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 text-cream"
          >
            X
          </button>
        </animated.div>
      )}
    </div>
  );
}

export default GlobeComponent;
