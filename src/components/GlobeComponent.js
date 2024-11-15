// src/components/GlobeComponent.js

import React, { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';
import { animated, useSpring } from 'react-spring';
import * as THREE from 'three';

const disasterMarkers = [
  { id: 1, name: 'Waldbrand Kalifornien', coordinates: [-119.4179, 36.7783], type: 'fire' },
  { id: 2, name: 'Flut Valencia', coordinates: [-0.3763, 39.4699], type: 'flood' },
  { id: 3, name: 'Hurrikan Milton', coordinates: [-70.8333, 24.5], type: 'hurricane' },
  { id: 4, name: 'Überschwemmung Bangladesch', coordinates: [90.3563, 23.6850], type: 'flood' },
  { id: 5, name: 'Erdbeben Japan', coordinates: [138.2529, 36.2048], type: 'earthquake' },
  { id: 6, name: 'Vulkanausbruch Island', coordinates: [-19.0208, 64.9631], type: 'volcano' },
  { id: 7, name: 'Dürre Afrika', coordinates: [34.5085, -1.9403], type: 'drought' },
  { id: 8, name: 'Sturm Australien', coordinates: [133.7751, -25.2744], type: 'storm' },
  { id: 9, name: 'Überschwemmung Indien', coordinates: [78.9629, 20.5937], type: 'flood' },
  { id: 10, name: 'Hitzewelle Europa', coordinates: [10.4515, 51.1657], type: 'heatwave' },
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

  const markerIcons = {
    fire: '🔥',
    flood: '🌊',
    hurricane: '🌀',
    earthquake: '🌐',
    volcano: '🌋',
    drought: '☀️',
    storm: '🌩️',
    heatwave: '🌞',
  };

  const customMarker = (marker) => {
    const sprite = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: new THREE.CanvasTexture(generateMarker(markerIcons[marker.type] || '❗️')),
        depthTest: false,
      })
    );
    sprite.scale.set(0.5, 0.5, 1);
    return sprite;
  };

  const generateMarker = (text) => {
    const size = 64;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext('2d');
    context.fillStyle = 'rgba(0, 0, 0, 0)';
    context.fillRect(0, 0, size, size);
    context.font = '48px sans-serif';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(text, size / 2, size / 2);
    return canvas;
  };

  return (
    <div className="relative w-full h-screen">
      <Globe
        ref={globeEl}
        globeImageUrl="https://unpkg.com/three-globe@2.34.4/example/img/earth-dark.jpg"
        backgroundColor="rgba(0,0,0,0)"
        labelsData={disasterMarkers}
        labelLat={(d) => d.coordinates[1]}
        labelLng={(d) => d.coordinates[0]}
        labelText={(d) => ''}
        labelSize={1.5}
        labelDotRadius={0.4}
        labelColor={() => 'rgba(255, 165, 0, 0.75)'}
        labelResolution={2}
        labelAltitude={0.01}
        labelTypeFace={'Arial'}
        onLabelClick={handleMarkerClick}
        customLayerData={disasterMarkers}
        customThreeObject={customMarker}
        customThreeObjectUpdate={(obj, marker) => {
          obj.position.copy(globeEl.current.getCoords(marker.coordinates[1], marker.coordinates[0], 0.01));
        }}
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
