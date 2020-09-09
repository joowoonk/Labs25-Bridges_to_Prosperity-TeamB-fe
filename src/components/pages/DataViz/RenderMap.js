import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import React, { useState, useRef, useCallback, useContext } from 'react';
import ReactMapGL, { FullscreenControl, NavigationControl } from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder';
import { BridgesContext } from '../../../state/bridgesContext';
import Markers from './Markers';
import DetailsInfo from './DetailsInfo';

const RenderMap = () => {
  const [viewport, setViewport] = useState({
    latitude: -1.9444,
    longitude: 30.0616,
    zoom: 7.8,
    bearing: 0,
    pitch: 0,
  });
  const { bridgeData, detailsData } = useContext(BridgesContext);
  const geocoderContainerRef = useRef();
  const mapRef = useRef();
  const handleViewportChange = useCallback(
    newViewport => setViewport(newViewport),
    []
  );

  return (
    <div className="mapbox-react">
      <ReactMapGL
        id="map"
        className="map"
        ref={mapRef}
        {...viewport}
        width="90%"
        height="90vh"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={handleViewportChange}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      >
        <div ref={geocoderContainerRef} className="search-bar">
          <Geocoder
            mapRef={mapRef}
            countries="rw"
            marker={false}
            onViewportChange={handleViewportChange}
            containerRef={geocoderContainerRef}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            position="top-left"
          />
        </div>

        <div className="fullScreenControl">
          <FullscreenControl />
        </div>

        <div className="navigationControl">
          <NavigationControl />
        </div>

        <Markers setViewport={setViewport} bridgeData={bridgeData} />

        {detailsData && <DetailsInfo />}
      </ReactMapGL>
    </div>
  );
};

export default RenderMap;
