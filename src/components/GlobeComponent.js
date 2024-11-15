// src/components/GlobeComponent.js

import React, { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';
import { animated, useSpring } from 'react-spring';
import * as THREE from 'three';
import { gsap } from 'gsap';

const disasterMarkers = [
  {
    id: 1,
    name: 'Waldbrand Kalifornien',
    label: 'Wildfire in California, USA',
    description:
      'Severe wildfires have been affecting California due to extreme heat and dry conditions.',
    image: '/images/california-wildfire.jpg',
    coordinates: [-119.4179, 36.7783],
    type: 'fire',
  },
  {
    id: 2,
    name: 'Flut Valencia',
    label: 'Floods in Valencia, Spain',
    description:
      'Heavy rainfall has caused flooding in Valencia, affecting thousands of residents.',
    image: '/images/valencia-flood.jpg',
    coordinates: [-0.3763, 39.4699],
    type: 'flood',
  },
  {
    id: 3,
    name: 'Hurrikan Milton',
    label: 'Hurricane Milton',
    description:
      'Hurricane Milton is approaching the east coast with winds up to 150 mph.',
    image: '/images/hurricane-milton.jpg',
    coordinates: [-70.8333, 24.5],
    type: 'hurricane',
  },
  // ... Add similar details for the rest of the markers
];

function GlobeComponent() {
  const globeEl = useRef();
  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    globeEl.current.pointOfView({ lat: 0, lng: 0, altitude: 2 }, 0);
    const controls = globeEl.current.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.11; // Adjusted rotation speed
    controls.enableDamping = true; // Enable smooth damping
    controls.dampingFactor = 0.05; // Damping factor

    // Configure controls for touch interactions
    controls.touches = {
      ONE: THREE.TOUCH.ROTATE, // Enable rotation on one-finger touch
      TWO: THREE.TOUCH.DOLLY_PAN, // Allow zooming and panning with two fingers
    };
    controls.enablePan = false; // Optional: disable panning if not needed
  }, []);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  const handleClose = () => {
    setSelectedMarker(null);
  };

  // Popup animation
  const popupAnimation = useSpring({
    opacity: selectedMarker ? 1 : 0,
    transform: selectedMarker ? 'scale(1)' : 'scale(0)',
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
    landslide: '🪨',
    typhoon: '🌪️',
    tornado: '🌪️',
    avalanche: '🏔️',
    storm_surge: '🌊',
  };

  const createMarkerMesh = (d) => {
    const canvas = document.createElement('canvas');
    const size = 256; // Larger size for higher resolution
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext('2d');
    context.font = '200px sans-serif'; // Larger font size
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(markerIcons[d.type] || '❗', size / 2, size / 2);
    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
    });
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(10, 10, 1); // Increased size for better touch accuracy
    sprite.frustumCulled = false; // Ensure sprite is included in raycasting

    // Store the marker data in userData
    sprite.userData = d;

    // GSAP animation
    animateSprite(sprite);

    return sprite;
  };

  // GSAP animation function
  const animateSprite = (sprite) => {
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(sprite.scale, {
      x: 12.5,
      y: 12.5,
      duration: 1,
      ease: 'sine.inOut',
    });
  };

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="relative w-full h-screen globe-container">
        <Globe
          ref={globeEl}
          globeImageUrl="https://www.paul-reed.co.uk/images/atlas1.jpg"
          backgroundColor="rgba(0,0,0,0)"
          objectsData={disasterMarkers}
          objectLat={(d) => d.coordinates[1]}
          objectLng={(d) => d.coordinates[0]}
          objectAltitude={0.01}
          objectThreeObject={createMarkerMesh}
          onObjectClick={(obj) => {
            handleMarkerClick(obj);
          }}
          enablePointerInteraction={true}
          animateIn={true}
          labelsData={disasterMarkers}
          labelLat={(d) => d.coordinates[1]}
          labelLng={(d) => d.coordinates[0]}
          labelText={(d) => d.label}
          labelSize={1}
          labelDotRadius={0}
          labelColor={() => 'white'}
          labelResolution={2}
          labelAltitude={0.02}
          labelIncludeDot={false}
        />
        {selectedMarker && (
          <animated.div
            style={popupAnimation}
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            <div className="relative bg-dark bg-opacity-90 text-cream p-5 rounded-lg shadow-lg max-w-md w-full">
              <button
                onClick={handleClose}
                className="absolute top-2 right-2 text-cream focus:outline-none"
              >
                X
              </button>
              {selectedMarker.image && (
                <img
                  src={selectedMarker.image}
                  alt={selectedMarker.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              )}
              <h3 className="text-xl font-bold mb-2">
                {selectedMarker.label || selectedMarker.name}
              </h3>
              <p className="mb-4">{selectedMarker.description}</p>
              <div className="flex justify-around">
                <button
                  onClick={() => alert('More information coming soon!')}
                  className="px-4 py-2 bg-greenLight text-dark rounded hover:bg-greenDark"
                >
                  Inform
                </button>
                <button
                  onClick={() => alert('Quiz coming soon!')}
                  className="px-4 py-2 bg-greenLight text-dark rounded hover:bg-greenDark"
                >
                  Quiz
                </button>
                <button
                  onClick={() => alert('Donations coming soon!')}
                  className="px-4 py-2 bg-greenLight text-dark rounded hover:bg-greenDark"
                >
                  Donate
                </button>
              </div>
            </div>
          </animated.div>
        )}
      </div>
    </div>
  );
}

export default GlobeComponent;
