import React, { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';
import './GlobeComponent.css';
import { animated, useSpring } from 'react-spring';

const disasterMarkers = [
  { id: 1, name: 'Waldbrand Kalifornien', coordinates: [-119.4179, 36.7783] },
  { id: 2, name: 'Flut Valencia', coordinates: [-0.3763, 39.4699] },
  { id: 3, name: 'Hurricane Milton', coordinates: [-70.8333, 24.5] },
  { id: 4, name: 'Überschwemmung Bangladesch', coordinates: [90.3563, 23.6850] },
  { id: 5, name: 'Erdbeben Japan', coordinates: [138.2529, 36.2048] },
  { id: 6, name: 'Dürre Afrika', coordinates: [34.5085, -1.9403] },
  { id: 7, name: 'Vulkanausbruch Island', coordinates: [-19.0208, 64.9631] },
  { id: 8, name: 'Sturm Australien', coordinates: [133.7751, -25.2744] },
  { id: 9, name: 'Überschwemmung Indien', coordinates: [78.9629, 20.5937] },
  { id: 10, name: 'Hitzewelle Europa', coordinates: [10.4515, 51.1657] },
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

  // Animation für die Info-Box
  const animationProps = useSpring({
    opacity: selectedMarker ? 1 : 0,
    transform: selectedMarker ? `translateY(0%)` : `translateY(-20%)`,
    config: { tension: 200, friction: 20 },
  });

  return (
    <div className="globe-container">
      <Globe
        ref={globeEl}
        globeImageUrl="/textures/earth-cartoon.jpg" // Lokale Textur
        backgroundColor="#e2edf3"
        pointsData={disasterMarkers}
        pointLat={(d) => d.coordinates[1]}
        pointLng={(d) => d.coordinates[0]}
        pointAltitude={0.01}
        pointRadius={0.5}
        pointColor={() => '#a4c465'}
        onPointClick={handleMarkerClick}
      />
      {selectedMarker && (
        <animated.div style={animationProps} className="info-box">
          <h3>{selectedMarker.name}</h3>
          <button onClick={() => alert('Quiz kommt bald!')}>Quiz</button>
          <button onClick={() => alert('Lerneinheit kommt bald!')}>Lerneinheit</button>
          <button onClick={handleClose} className="close-button">X</button>
        </animated.div>
      )}
    </div>
  );
}

export default GlobeComponent;
