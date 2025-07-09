import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';

function HomePage() {
  return (
    <div className={styles.heroContainer}>
      <h1 className={styles.title}>FORJA VÓXEL</h1>
      <p className={styles.slogan}>
        Dando forma a tus ideas, píxel a píxel.
      </p>
      <Link to="/productos" className={`pixel-button ${styles.ctaButton}`}>
        Ver Productos
      </Link>
    </div>
  );
}

export default HomePage;