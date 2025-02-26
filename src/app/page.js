"use client"; // Ensures this component runs only on the client side

import MapComponent from "./components/Map/MapComponent";
import styles from "./page.module.css";

const Page = () => {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>Alumni Map</h1>
      <MapComponent />
    </div>
  );
};

export default Page;