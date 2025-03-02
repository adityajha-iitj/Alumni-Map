"use client"; // Ensures this component runs only on the client side

import { useState } from "react";
import MapComponent from "./components/Map/MapComponent";
import styles from "./page.module.css";

const Page = () => {
  const [isNavActive, setIsNavActive] = useState(false);

  const navSlide = () => {
    setIsNavActive(!isNavActive);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.heading}>
        <h1>Alumni Map</h1>
      </div>
      <title>Alumni Map</title>

      <nav className={styles.nav}>
        <img
          src="IIT-logo.png"
          alt="IIT Jodhpur Logo"
          className={styles.logo}
        ></img>
        <div className={styles.iitj}>
          <h1> IIT Jodhpur: Society of Alumni Affairs</h1>
        </div>

        <ul className={`${styles.list} ${isNavActive ? styles.navActive : ""}`}>
          <li>
            <a href="#">INITIATIVES</a>
          </li>
          <li>
            <a href="#">COMMUNITY</a>
          </li>
          <li>
            <a href="#">EVENTS</a>
          </li>
          <li>
            <a href="#">ABOUT US</a>
          </li>
          <li>
            <a href="#">SUPPORT</a>
          </li>
          <li>
            <a href="#">LEGACY</a>
          </li>
        </ul>
        <div className={styles.burger} onClick={navSlide}>
          <div className={styles.line1}></div>
          <div className={styles.line2}></div>
          <div className={styles.line3}></div>
        </div>
      </nav>

      <MapComponent zIndex={1} />
    </div>
  );
};

export default Page;
