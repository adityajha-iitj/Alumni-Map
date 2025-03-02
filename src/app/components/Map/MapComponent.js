"use client";

import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import styles from "./MapComponent.module.css";


const customIcon = new L.Icon({
  iconUrl: "/marker-icon-2x.png",
  shadowUrl: "/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const createClusterCustomIcon = (cluster) => {
  const count = cluster.getChildCount();
  let color = count > 50 ? "rgb(10, 55, 92)" : count > 10 ? "rgb(10, 55, 92)" : "rgba(10,55,92)";
  let width, height;
  let font_size;

  if (count > 100) {
    width = 80;
    height = 80;
    font_size = 30;
  } else if (count > 50) {
    width = 60;
    height = 60;
    font_size = 20;
  } else if (count > 10) {
    width = 40;
    height = 40;
    font_size = 20;
  } else {
    width = 20;
    height = 20;
  }
  if (count > 100) {
    font_size = 30;
  } else if (count > 50) {
    font_size = 20;
  } else if (count > 10) {
    font_size = 20;
  } else {
    font_size = 12;
  }

  return L.divIcon({
    html: `<div style="background-color:${color}; width:${width}px; height:${height}px;
           border-radius:50%; display:flex; align-items:center;justify-content:center;
           color:white; font-weight:bold; font-size:${font_size}px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);">${count}</div>`,
    className: "custom-cluster",
    iconSize: L.point[(width, height)],
  });
};


const CenterButton = () => {
  const map = useMap(); 

  useEffect(() => {
    if (!map) return;

    const centerControl = L.control({ position: "topleft" });

    centerControl.onAdd = () => {
      const button = L.DomUtil.create("button", "leaflet-bar leaflet-control");
      button.innerHTML = "⌖";
      button.style.width = "40px"; 
      button.style.height = "40px";
      button.style.borderRadius = "50%"; 
      button.style.background = "rgb(10, 55, 92)"; 
      button.style.color = "white";
      button.style.fontSize = "20px";
      button.style.fontWeight = "bold";
      button.style.border = "none";
      button.style.cursor = "pointer";
      button.style.boxShadow = "0 0 10px rgba(10, 55, 92, 0.8)"; 
      button.style.transition = "all 0.3s ease-in-out";

      // Hover effect
      button.onmouseover = () => {
        button.style.boxShadow = "0 0 15px rgba(10, 55, 255, 1)";
        button.style.transform = "scale(1.1)";
      };
      button.onmouseleave = () => {
        button.style.boxShadow = "0 0 10px rgba(10, 55, 92, 0.8)";
        button.style.transform = "scale(1)";
      };

      button.onclick = () => map.setView([30, 0], 2.3); 

      return button;
    };

    centerControl.addTo(map);

    return () => {
      map.removeControl(centerControl);
    };
  }, [map]);

  return null;
};

const MapComponent = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef(null);

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
    [-85, 180],
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
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
      />
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
      />

<CenterButton />

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
