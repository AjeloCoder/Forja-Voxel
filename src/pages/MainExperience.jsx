import React from 'react';
import styles from './MainExperience.module.css';

// Importa las secciones que necesitarás
import HeroSection from '../componentes/sections/HeroSection';
import CatalogSection from '../componentes/sections/CatalogSection';
import TallerSection from '../componentes/sections/TallerSection';

// El componente principal que orquesta el scroll
function MainExperience() {
  return (
    <div className={styles.mainContainer}>
      <HeroSection />
      <CatalogSection />
      <TallerSection />
    </div>
  );
}

export default MainExperience;