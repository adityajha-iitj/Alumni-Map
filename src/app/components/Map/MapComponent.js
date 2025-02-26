"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";
import MarkerClusterGroup from "react-leaflet-cluster";
import styles from "./MapComponent.module.css";

// Custom Marker Icon
const customIcon = new L.Icon({
  iconUrl: "/marker-icon-2x.png",
  shadowUrl: "/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Sample location data
const locations = [
  { lat: 51.505, lng: -0.09, name: "London" },
  { lat: 40.7128, lng: -74.006, name: "New York" },
  { lat: 37.7749, lng: -122.4194, name: "San Francisco" },
  { lat: 19.076, lng: 72.8777, name: "Mumbai" },
  { lat: 35.6895, lng: 139.6917, name: "Tokyo" },
];

// Custom Cluster Icons
const createClusterCustomIcon = (cluster) => {
  const count = cluster.getChildCount();
  let color = count > 5000 ? "blue" : "orange";

  return L.divIcon({
    html: `<div class="cluster-icon cluster-${color}">${count}</div>`,
    className: "custom-cluster",
    iconSize: L.point(40, 40),
  });
};

const MapComponent = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <p className={styles.loadingText}>Loading map...</p>;

  const bounds = [
    [85, -180],
    [-85, 180]
  ];

  return (
    <MapContainer
      center={[30, 0]} // Centered globally
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
      <MarkerClusterGroup chunkedLoading iconCreateFunction={createClusterCustomIcon}>
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