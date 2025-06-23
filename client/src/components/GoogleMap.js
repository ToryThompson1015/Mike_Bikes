import React, { useCallback, useRef } from 'react';
import styled from 'styled-components';
import { GoogleMap, useJsApiLoader, Marker, Circle } from '@react-google-maps/api';

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 400px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const atlanta = {
  lat: 33.749,
  lng: -84.388
};

const radiusInMeters = 160934; // 100 miles in meters

const mapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
  styles: [
    {
      featureType: 'poi',
      stylers: [{ visibility: 'off' }]
    },
    {
      featureType: 'transit',
      stylers: [{ visibility: 'off' }]
    }
  ]
};

const containerStyle = {
  width: '100%',
  height: '100%'
};

const GoogleMapComponent = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '',
  });
  const mapRef = useRef(null);

  const onLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) {
    return <MapContainer><div style={{textAlign:'center',padding:'40px'}}>Map cannot be loaded right now.</div></MapContainer>;
  }
  if (!isLoaded) {
    return <MapContainer><div style={{textAlign:'center',padding:'40px'}}>Loading map...</div></MapContainer>;
  }

  return (
    <MapContainer>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={atlanta}
        zoom={8}
        options={mapOptions}
        onLoad={onLoad}
      >
        <Marker position={atlanta} label="Atlanta" />
        <Circle
          center={atlanta}
          radius={radiusInMeters}
          options={{
            fillColor: '#1976d2',
            fillOpacity: 0.15,
            strokeColor: '#1976d2',
            strokeOpacity: 0.7,
            strokeWeight: 2
          }}
        />
      </GoogleMap>
    </MapContainer>
  );
};

export default GoogleMapComponent; 