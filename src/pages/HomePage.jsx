import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';

// Ya no necesita lógica de audio
function HomePage() {
  return (
    <div className={styles.heroContainer}>
      <div className={styles.titleContainer}>
          <h1 className={styles.title}>FORJA VÓXEL</h1>
        <Link to="/productos" className={`pixel-button ${styles.ctaButton} ${styles.blinking}`}>
          PRESS START
        </Link>
    </div>
    </div>
  );
}

export default HomePage;