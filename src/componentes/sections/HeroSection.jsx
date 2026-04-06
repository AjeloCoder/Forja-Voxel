import React from 'react'
import { Link } from 'react-router-dom';
import styles from './HeroSection.module.css';

function HeroSection() {
  return (
    // 'id="home"' es útil para el scroll-to-section
    <section id="home" className={styles.heroContainer}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>FORJA VÓXEL</h1>
        <a href="#catalogo" className={`pixel-button ${styles.ctaButton} ${styles.blinking}`}>
          PRESS START
        </a>
      </div>
    </section>
  );
}
export default HeroSection;
  