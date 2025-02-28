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

const createClusterCustomIcon = (cluster) => {
  const count = cluster.getChildCount(); 
  let color = count > 50 ? "blue" : count > 10 ? "blue" : "blue"; 
  let width, height;
  let font_size;

  if (count > 100) {
    width = 80;
    height = 80;
  } else if (count > 50) {
    width = 60;
    height = 60;
  } else if (count > 10) {
    width = 40;
    height = 40;
  } else {
    width = 20;
    height = 20;
  }
  if (count > 100){
    font_size = 30;
  }
  else if (count > 50){
    font_size = 20;
  }
  else if (count > 10){
    font_size = 20;
  }
  else{
    font_size = 12;
  }

  return L.divIcon({
    html: `<div style="background-color:${color}; width:${width}px; height:${height}px;
           border-radius:50%; display:flex; align-items:center; justify-content:center;
           color:white; font-weight:bold; font-size:${font_size}px">${count}</div>`,
    className: "custom-cluster",
    iconSize: L.point[width, height],
  });
};

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
  iconCreateFunction={createClusterCustomIcon} // Custom function to style clusters
  chunkedLoading
>
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
