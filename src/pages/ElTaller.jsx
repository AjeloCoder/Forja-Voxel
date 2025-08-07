import React from 'react';
import styles from './ElTaller.module.css';

// ¡Importante! En Vite, para que las imágenes de la carpeta `public`
// funcionen bien en desarrollo y producción, la forma más segura
// es construir la ruta a partir de la variable base de entorno.
const BASE_PATH = import.meta.env.BASE_URL;

function ElTaller() {
  return (
    <div className={styles.mainContainer}>

      {/* ===== ESCENA 1: LA ENTRADA ===== */}
      <section className={styles.section}>
        <div 
          className={styles.backgroundImage}
          style={{ backgroundImage: `url(${BASE_PATH}images/Taller.jpeg)` }}
        />
        <div className={styles.content}>
          <h1 className={styles.title}>El Taller</h1>
        </div>
      </section>

      {/* ===== ESCENA 2: EL HERRERO ===== */}
      <section className={styles.section}>
        <div className={styles.gridContainer}>
          <div className={styles.leftColumn}>
            <img 
              src={`${BASE_PATH}images/Herrero.jpeg`} 
              alt="Alejo, el herrero digital de Forja Vóxel" 
              className={styles.avatarImage} 
            />
          </div>
          <div className={styles.rightColumn}>
            <h2 className={styles.sectionTitle}>El Herrero</h2>
            <p>
              ¡Hola! Soy Alejo, el artesano detrás de Forja Vóxel. Acá es donde mis pasiones colisionan: Programar, crear y compartir. Un lugar para convertir píxeles en realidad. Mi misión es acompañarte para transformar tus ideas y algo tangible, ya sea de utilidad o decorativo.
            </p>
          </div>
        </div>
      </section>

      {/* ===== ESCENA 3: EL ARSENAL ===== */}
      <section className={styles.section}>
        <div 
          className={styles.backgroundImage}
          style={{ backgroundImage: `url(${BASE_PATH}images/Arsenal.jpeg)` }}
        />
        <div className={styles.content}>
          <h2 className={styles.sectionTitle}>El Arsenal</h2>
          <p>Herramientas de precisión para creaciones legendarias.</p>
        </div>
      </section>

      {/* ===== ESCENA 4: ENCARGOS ESPECIALES (el formulario) ===== */}
      <section className={styles.section}>
        <div className={styles.content}>
            <h2 className={styles.sectionTitle}>¿Necesitas un Arma a Medida?</h2>
            <p>Si tienes un diseño que quieres traer a la vida, estás en el lugar correcto. Cuéntame tu proyecto y forjaremos algo increíble juntos.</p>
            {/* Aquí irá el formulario de Formspree */}
        </div>
      </section>

    </div>
  );
}

export default ElTaller;