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
    label: 'Waldbrand in Kalifornien, USA',
    description:
      'Schwere Waldbrände haben Kalifornien aufgrund extremer Hitze und Trockenheit heimgesucht.',
    image: '/images/california-wildfire.png',
    coordinates: [-119.4179, 36.7783],
    type: 'fire',
  },
  {
    id: 2,
    name: 'Flut Valencia',
    label: 'Überschwemmungen in Valencia, Spanien',
    description:
      'Starke Regenfälle haben in Valencia zu Überschwemmungen geführt und Tausende von Bewohnern betroffen.',
    image: '/images/valencia-flood.jpg',
    coordinates: [-0.3763, 39.4699],
    type: 'flood',
  },
  {
    id: 3,
    name: 'Hurrikan Milton',
    label: 'Hurrikan Milton',
    description:
      'Hurrikan Milton nähert sich der Ostküste mit Windgeschwindigkeiten von bis zu 150 mph.',
    image: '/images/hurricane-milton.jpg',
    coordinates: [-70.8333, 24.5],
    type: 'hurricane',
  },
  {
    id: 4,
    name: 'Erdbeben Türkei',
    label: 'Erdbeben in der Türkei',
    description:
      'Ein starkes Erdbeben der Stärke 6,8 hat die östliche Türkei erschüttert und erhebliche Schäden verursacht.',
    image: '/images/turkey-earthquake.jpeg',
    coordinates: [38.9637, 35.2433],
    type: 'earthquake',
  }/*,
  {
    id: 5,
    name: 'Vulkanausbruch Island',
    label: 'Vulkanausbruch in Island',
    description:
      'Der Vulkan Hekla in Island ist ausgebrochen und hat eine Aschewolke ausgestoßen, die den Flugverkehr beeinträchtigt.',
    image: '/images/iceland-volcano.jpg',
    coordinates: [-19.7, 63.9833],
    type: 'volcano',
  },
  {
    id: 6,
    name: 'Dürre Ostafrika',
    label: 'Dürre in Ostafrika',
    description:
      'Eine anhaltende Dürre hat in Ostafrika zu Wasserknappheit und Ernährungsunsicherheit geführt.',
    image: '/images/east-africa-drought.jpg',
    coordinates: [35.0, 0.0],
    type: 'drought',
  },
  {
    id: 7,
    name: 'Sturm Deutschland',
    label: 'Sturm in Deutschland',
    description:
      'Ein schwerer Sturm hat in Norddeutschland zu Sachschäden und Verkehrsbehinderungen geführt.',
    image: '/images/germany-storm.jpg',
    coordinates: [10.4515, 51.1657],
    type: 'storm',
  },
  {
    id: 8,
    name: 'Hitzewelle Australien',
    label: 'Hitzewelle in Australien',
    description:
      'Eine extreme Hitzewelle hat in Australien zu Rekordtemperaturen und erhöhter Brandgefahr geführt.',
    image: '/images/australia-heatwave.jpg',
    coordinates: [133.7751, -25.2744],
    type: 'heatwave',
  },
  {
    id: 9,
    name: 'Erdrutsch Nepal',
    label: 'Erdrutsch in Nepal',
    description:
      'Starke Monsunregen haben in Nepal Erdrutsche ausgelöst, die Dörfer zerstört und Straßen unpassierbar gemacht haben.',
    image: '/images/nepal-landslide.jpg',
    coordinates: [84.1240, 28.3949],
    type: 'landslide',
  },
  {
    id: 10,
    name: 'Taifun Japan',
    label: 'Taifun in Japan',
    description:
      'Taifun Usagi hat Japan getroffen und zu Überschwemmungen sowie Stromausfällen geführt.',
    image: '/images/japan-typhoon.jpg',
    coordinates: [138.2529, 36.2048],
    type: 'typhoon',
  },
  {
    id: 11,
    name: 'Tornado USA',
    label: 'Tornado in den USA',
    description:
      'Ein EF3-Tornado hat Teile von Oklahoma City verwüstet und mehrere Verletzte gefordert.',
    image: '/images/usa-tornado.jpg',
    coordinates: [-97.5164, 35.4676],
    type: 'tornado',
  },
  {
    id: 12,
    name: 'Lawine Schweiz',
    label: 'Lawine in der Schweiz',
    description:
      'Eine Lawine in den Schweizer Alpen hat mehrere Skifahrer verschüttet und Rettungsaktionen ausgelöst.',
    image: '/images/switzerland-avalanche.jpg',
    coordinates: [8.2275, 46.8182],
    type: 'avalanche',
  },
  {
    id: 13,
    name: 'Sturmflut Niederlande',
    label: 'Sturmflut in den Niederlanden',
    description:
      'Eine Sturmflut hat die niederländische Küste getroffen und zu Überschwemmungen in mehreren Städten geführt.',
    image: '/images/netherlands-storm-surge.jpg',
    coordinates: [5.2913, 52.1326],
    type: 'storm_surge',
  },
  {
    id: 14,
    name: 'Überschwemmungen Italien',
    label: 'Überschwemmungen in Italien',
    description:
      'Schwere Regenfälle haben in Sizilien zu Überschwemmungen geführt, insbesondere in der Provinz Catania.',
    image: '/images/italy-flood.jpg',
    coordinates: [15.0873, 37.5027],
    type: 'flood',
  },
  {
    id: 15,
    name: 'Hurrikan Helene',
    label: 'Hurrikan Helene',
    description:
      'Hurrikan Helene hat den Südosten der USA schwer getroffen und erhebliche Schäden verursacht.',
    image: '/images/hurricane-helene.jpg',
    coordinates: [-83.0, 30.0],
    type: 'hurricane',
  },*/
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
          globeImageUrl="/images/atlas1.jpg"
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
          labelSize={1.2}
          labelDotRadius={0}
          labelColor={() => 'white'}
          labelResolution={2}
          labelAltitude={0}
          labelIncludeDot={false}
          labelClass={() => 'globe-label'}
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
