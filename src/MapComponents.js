import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { livabilityData } from "../data/livabilityData";
import "../styles/MapStyles.css";

const MapComponent = () => {
  const [map, setMap] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [center] = useState({ lat: 18.9764, lng: 72.8261 }); // Default to Mahalakshmi

  const mapOptions = {
    zoom: 12,
    disableDefaultUI: true,
    styles: [
      { featureType: "poi", stylers: [{ visibility: "off" }] },
      { featureType: "transit", stylers: [{ visibility: "off" }] },
    ],
  };

  const onLoad = (mapInstance) => {
    setMap(mapInstance);
  };

  const onUnmount = () => {
    setMap(null);
  };

  const handleMarkerClick = (location) => {
    setSelectedLocation(location);
  };

  const getMarkerColor = (score) => {
    if (score <= 3) return "red";
    if (score <= 6) return "yellow";
    return "green";
  };

  return (
    <div className="map-container">
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100vh" }}
        center={center}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={mapOptions}
      >
        {livabilityData.map((data, index) => (
          <Marker
            key={index}
            position={data.location}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              fillColor: getMarkerColor(data.overallScore),
              fillOpacity: 0.8,
              strokeWeight: 1,
              scale: 10,
            }}
            onClick={() => handleMarkerClick(data)}
          />
        ))}

        {selectedLocation && (
          <InfoWindow
            position={selectedLocation.location}
            onCloseClick={() => setSelectedLocation(null)}
          >
            <div>
              <h3>{selectedLocation.name}</h3>
              <p>
                Overall Livability Score: {selectedLocation.overallScore}/10
              </p>
              <p>Powered by The Livability Fund (livability.org)</p>
              <ul>
                <li>Water: {selectedLocation.indicators.water}</li>
                <li>Sanitation: {selectedLocation.indicators.sanitation}</li>
                <li>Nutrition: {selectedLocation.indicators.nutrition}</li>
                <li>Education: {selectedLocation.indicators.education}</li>
                <li>Health: {selectedLocation.indicators.health}</li>
                <li>Social Interaction: {selectedLocation.indicators.socialInteraction}</li>
              </ul>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default MapComponent;
