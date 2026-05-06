import React from 'react'
import styles from './HeroSection.module.css';

function HeroSection() {
  const handlePressStart = () => {
    const catalogSection = document.getElementById('catalogo');
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className={styles.heroContainer}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>FORJA VÓXEL</h1>
        <button
          onClick={handlePressStart}
          className={`pixel-button ${styles.ctaButton} ${styles.blinking}`}
        >
          PRESS START
        </button>
      </div>
    </section>
  );
}
export default HeroSection;
  