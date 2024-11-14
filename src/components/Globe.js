import React, { useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';

function GlobeComponent() {
  const globeEl = useRef();

  useEffect(() => {
    globeEl.current.pointOfView({ lat: 0, lng: 0, altitude: 2 });
  }, []);

  return (
    <div className="globe-container">
      <Globe
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        backgroundColor="#e2edf3"
      />
    </div>
  );
}

export default GlobeComponent;
