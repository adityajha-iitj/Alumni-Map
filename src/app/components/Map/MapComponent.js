"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import styles from "./MapComponent.module.css";

// Custom Marker Icon
const customIcon = new L.Icon({
  iconUrl: "/marker-icon-2x.png",
  shadowUrl: "/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});



const MapComponent = () => {
  const [locations, setLocations] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/coordinates.json") 
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setLocations(data); 
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading locations:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className={styles.loadingText}>Loading map...</p>;

  const bounds = [
    [85, -180],
    [-85, 180]
  ];

  return (
    <MapContainer
      center={[30, 0]}
      zoom={2.3}
      className={styles.mapContainer}
      minZoom={2.2}
      maxZoom={12}
      maxBounds={bounds}
      maxBoundsViscosity={2.0}
      scrollWheelZoom={true}
      zoomDelta={0.5}
    >
      {/* Grayscale Tile Layer */}
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
      />
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
      />

      {/* Marker Clustering */}
      <MarkerClusterGroup 
        maxClusterRadius={(zoom) => {
          if (zoom >= 12) return 10;  // Almost no clustering at high zoom
          if (zoom >= 10) return 30;  // Slight clustering
          return 80; // Default clustering radius
        }}
        animate = {true}
        // iconCreateFunction={createClusterCustomIcon}
        chunkedLoading>
        {locations.map((loc, index) => (
          <Marker key={index} position={[loc.lat, loc.lng]} icon={customIcon}>
            <Popup>{loc.name}</Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default MapComponent;