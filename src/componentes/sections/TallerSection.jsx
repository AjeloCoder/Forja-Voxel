import React from 'react';
import styles from './TallerSection.module.css';
const BASE_PATH = import.meta.env.BASE_URL;

function TallerSection() {
  // Aquí es donde en el futuro pondremos la lógica de animaciones de GSAP
  return (
    // 'id="taller"' para la navegación por scroll
    <div id="taller" className={styles.mainContainer}>
      <section className={styles.section}>

          <div className={styles.content}>
              <h1 className={`${styles.title} ${styles.typewriter}`}>El Taller</h1>
          </div>
          
      </section>
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
                 <p className={styles.bioText}> 
                    ¡Hola! Soy Alejo, el artesano detrás de Forja Vóxel. Acá es donde mis pasiones colisionan: Programar, crear y compartir. Un lugar para convertir píxeles en realidad. Mi misión es acompañarte para transformar tus ideas y algo tangible, ya sea de utilidad o decorativo.
                  </p>
                </div>
              </div>
            </section>
      {/* ===== ESCENA 4: ENCARGOS ESPECIALES (el formulario) ===== */}
            <section className={`${styles.section} ${styles.sectionEncargos}`}>
              
              <div className={styles.encargosWrapper}>
              {/* 👇 LA "CAJA" CONTENEDORA QUE PEDISTE 👇 */}
              <div className={styles.formContainer}>
                
                {/* 👇 Le damos una clase única a este título 👇 */}
                <h2 className={styles.formTitle}>¿Necesitas un Arma a Medida?</h2>
      
                <p className={styles.textIntro}>
                  Si tienes un diseño que quieres traer a la vida, estás en el lugar correcto. Cuéntame tu proyecto y forjaremos algo increíble juntos.
                </p>
                
                <form
                  action="https://formspree.io/f/xnnzovqr"
                  method="POST"
                  encType="multipart/form-data" 
                  className={styles.contactForm}
                >
                  <label htmlFor="descripcion" className={styles.textareaLabel}>
              Descripción de tu Encargo:
          </label>
          <textarea 
            id="descripcion"
            name="descripcion" 
            rows="6" /* Un buen número de filas para empezar */
            placeholder="Ej: Quiero una figura de mi personaje de D&D, un gnomo pícaro con dos dagas. Mide unos 7cm de alto y..."
            required
          ></textarea>
    
                   <label htmlFor="name">Tu Nombre:</label>
                  <input id="name" type="text" name="name" required className={styles.textInput} />
          
          {/* --- Input de Email (AÑADIDO IMPORTANTE) --- */}
                  <label htmlFor="email">Tu Email:</label>
                  <input id="email" type="email" name="email" required className={styles.textInput} />
                  <button type="submit" className="pixel-button">Enviar Encargo</button>
                   </form>
                  </div>
      
      
                  <div className={styles.disclaimer}>
              <p>
              <strong>¡Importante!</strong> Una vez enviado tu encargo, nos contactaremos contigo para repasar todos los detalles (tamaño, colores, diseño final), darte el presupuesto y el tiempo estimado de forjado.
              </p>
                </div>
               
      
              </div>
            </section>
      
          </div>
      
  );
}
export default TallerSection;