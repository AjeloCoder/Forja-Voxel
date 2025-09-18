import React, { useState, useEffect, useRef } from 'react';
import styles from './ElTaller.module.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin'; 
import { Link } from 'react-router-dom';
import logoIcon from '../assets/imagenes/logo-icon.png';
// ¡Importante! En Vite, para que las imágenes de la carpeta `public`
// funcionen bien en desarrollo y producción, la forma más segura
// es construir la ruta a partir de la variable base de entorno.
const BASE_PATH = import.meta.env.BASE_URL;
gsap.registerPlugin(ScrollTrigger, TextPlugin);

function ElTaller() {
  const mainRef = useRef(null); // Ref para el contenedor principal de la página

  useEffect(() => {
    // Usamos gsap.context para un manejo seguro de las animaciones en React
    const ctx = gsap.context(() => {

      // --- ANIMACIÓN 1: MÁQUINA DE ESCRIBIR PARA EL TÍTULO ---
      gsap.to(`.${styles.title}`, { // Apuntamos al h1 con la clase .title
        duration: 1.5, // Cuánto tarda en escribir el texto completo
        text: "El Taller", // El texto que queremos que escriba
        ease: "none",
        
        // El disparador: la animación solo empieza cuando la sección entra en la vista
        scrollTrigger: {
          trigger: `.${styles.sectionIntro}`, // La primera sección
          start: "top 70%", // Empieza cuando la parte superior de la sección está al 70% de la ventana
          toggleActions: "play none none none" // La animación solo se ejecuta una vez
        }
      });
      
      // ... Aquí pondremos las demás animaciones ...

    }, mainRef); // Esto asegura que las animaciones solo afecten a elementos dentro de este componente

    // Limpieza: importante para que las animaciones se eliminen si sales de la página
    return () => ctx.revert();
  }, []); // El array vacío [] significa que este efecto se ejecuta solo una vez, al montar el componente

    const [fileName, setFileName] = useState("Ningún archivo seleccionado");

    const handleFileChange = (event) => {
        if (event.target.files.length > 0) {
            setFileName(event.target.files[0].name);
        } else {
            setFileName("Ningún archivo seleccionado");
        }
    };
   const [formData, setFormData] = useState({
    imantado: false,
    llavero: false,
    colores: [],
    // ... otros campos
  });
  return (
    <div className={styles.mainContainer}>
      <Link to="/" className={styles.homeIconLink} aria-label="Volver a la página de inicio">
        <img src={logoIcon} alt="Icono de Forja Vóxel" />
      </Link>
      {/* ===== ESCENA 1: LA ENTRADA ===== */}
        <section className={`${styles.section} ${styles.sectionIntro}`}>
        <div 
          className={styles.backgroundImage}
          style={{ backgroundImage: `url(${BASE_PATH}images/Taller.jpeg)` }}
        />
        <div className={styles.content}>
          {/* Dejamos el h1 vacío, GSAP lo rellenará */}
          <h1 className={`${styles.title} ${styles.typingCursor}`}></h1> 
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
        <div className={styles.arsenalContent}>
        <div 
          className={styles.backgroundImage}
          style={{ backgroundImage: `url(${BASE_PATH}images/Arsenal.jpeg)` }}
        />
        <div className={styles.content}>
          <h2 className={styles.sectionTitle}>El Arsenal</h2>
          <p>Herramientas de precisión para creaciones legendarias.</p>
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

            <label>
              <input type="checkbox" name="tipo_iman" /> ¿Diseño Imantado?
            </label>
            <label>
              <input type="checkbox" name="tipo_llavero" /> ¿Diseño Llavero?
            </label>
            <label>
              <input type="checkbox" name="tipo_boton_mecanico" /> ¿Diseño Botón Mecánico?
            </label>
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
        <strong>¡Importante!</strong> Una vez enviado tu encargo, nos pondremos en contacto contigo para repasar todos los detalles (tamaño, colores, diseño final), darte el presupuesto y el tiempo estimado de forjado.
        </p>
          </div>
         

        </div>
      </section>

    </div>
  );
}

export default ElTaller;