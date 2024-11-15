// src/components/GlobeComponent.js

import React, { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';
import { animated, useSpring } from 'react-spring';
import * as THREE from 'three';
import { gsap } from 'gsap';

const disasterMarkers = [
  { id: 1, name: 'Waldbrand Kalifornien', coordinates: [-119.4179, 36.7783], type: 'fire' },
  { id: 2, name: 'Flut Valencia', coordinates: [-0.3763, 39.4699], type: 'flood' },
  { id: 3, name: 'Hurrikan Milton', coordinates: [-70.8333, 24.5], type: 'hurricane' },
  { id: 4, name: 'Erdbeben in der Türkei', coordinates: [37.0, 38.0], type: 'earthquake' },
  { id: 5, name: 'Überschwemmungen in Myanmar', coordinates: [95.9562, 21.9162], type: 'flood' },
  { id: 6, name: "Erdrutsch in Xi'an, China", coordinates: [108.9398, 34.3416], type: 'landslide' },
  { id: 7, name: 'Hurrikan Hilary in Mexiko', coordinates: [-110.0, 25.0], type: 'hurricane' },
  { id: 8, name: 'Taifun Saola in den Philippinen', coordinates: [121.7740, 12.8797], type: 'typhoon' },
  { id: 9, name: 'Hurrikan Idalia in Florida, USA', coordinates: [-82.9001, 27.9944], type: 'hurricane' },
  { id: 10, name: 'Taifun Haikui in Taiwan', coordinates: [120.9605, 23.6978], type: 'typhoon' },
  { id: 11, name: 'Starkregen in Tajikistan', coordinates: [71.2761, 38.8610], type: 'flood' },
  { id: 12, name: 'Sturmflut an der Ostsee', coordinates: [10.0, 54.0], type: 'storm_surge' },
  { id: 13, name: 'Waldbrände in Brasilien', coordinates: [-51.9253, -14.2350], type: 'fire' },
  { id: 14, name: 'Dürre in Somalia', coordinates: [45.0, 5.0], type: 'drought' },
  { id: 15, name: 'Lawinen in den Alpen', coordinates: [10.0, 46.0], type: 'avalanche' },
  { id: 16, name: 'Vulkanausbruch auf Island', coordinates: [-19.0, 64.0], type: 'volcano' },
  { id: 17, name: 'Tornado in Oklahoma, USA', coordinates: [-97.0, 35.5], type: 'tornado' },
  { id: 18, name: 'Hitzewelle in Südeuropa', coordinates: [15.0, 41.0], type: 'heatwave' },
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
      ONE: THREE.TOUCH.ROTATE,
      TWO: THREE.TOUCH.DOLLY_PAN,
    };
    controls.enablePan = false; // Disable panning if not needed

    // Ensure atmosphere does not block events
    globeEl.current.scene().children.forEach((obj) => {
      if (obj.name === 'atmosphere') {
        obj.material.depthWrite = false;
        obj.renderOrder = -1;
      }
    });

    // Prevent default touch behaviors
    const canvas = globeEl.current.renderer().domElement;

    const preventDefault = (event) => event.preventDefault();

    canvas.addEventListener('touchstart', preventDefault, { passive: false });
    canvas.addEventListener('touchmove', preventDefault, { passive: false });

    // Handle touch events manually
    const handleTouch = (event) => {
      const touch = event.changedTouches[0];
      const mouse = new THREE.Vector2();
      const rect = canvas.getBoundingClientRect();

      const devicePixelRatio = window.devicePixelRatio || 1;

      mouse.x =
        ((touch.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y =
        -((touch.clientY - rect.top) / rect.height) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, globeEl.current.camera());

      const intersects = raycaster.intersectObjects(
        globeEl.current.scene().children,
        true
      );

      if (intersects.length > 0) {
        const intersectedObject = intersects[0].object;
        if (intersectedObject.userData && intersectedObject.userData.marker) {
          handleMarkerClick(intersectedObject.userData.marker);
        }
      }
    };

    canvas.addEventListener('touchend', handleTouch, { passive: false });

    return () => {
      canvas.removeEventListener('touchstart', preventDefault);
      canvas.removeEventListener('touchmove', preventDefault);
      canvas.removeEventListener('touchend', handleTouch);
    };
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
      // Removed depthWrite: false
    });
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(6, 6, 1);
    sprite.frustumCulled = false; // Ensure sprite is included in raycasting

    // Store the marker data in userData
    sprite.userData = { marker: d };

    // GSAP animation
    animateSprite(sprite);

    return sprite;
  };

  // GSAP animation function
  const animateSprite = (sprite) => {
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(sprite.scale, {
      x: 7.5,
      y: 7.5,
      duration: 1,
      ease: 'sine.inOut',
    });
  };

  // Detect if the device is mobile
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);

  return (
    <div
      className="relative w-full h-screen globe-container"
      style={{ touchAction: 'manipulation' }} // Ensure touch interactions are allowed
    >
      <Globe
        ref={globeEl}
        globeImageUrl={
          isMobile
            ? 'https://unpkg.com/three-globe@2.34.4/example/img/earth-dark-small.jpg' // Use a lower-res image for mobile
            : 'https://unpkg.com/three-globe@2.34.4/example/img/earth-dark.jpg'
        }
        backgroundColor="rgba(0,0,0,0)"
        objectsData={disasterMarkers}
        objectLat={(d) => d.coordinates[1]}
        objectLng={(d) => d.coordinates[0]}
        objectAltitude={0.01}
        objectThreeObject={(d) => createMarkerMesh(d)}
        onObjectClick={(marker) => {
          handleMarkerClick(marker);
        }}
        enablePointerInteraction={true} // Ensure pointer interaction is enabled
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
