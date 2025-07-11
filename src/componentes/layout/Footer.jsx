// src/componentes/layout/Footer/Footer.jsx

import React from 'react';

// 1. Importa la imagen como antes
import alejoLogo from '../../assets/imagenes/Logo-Alejo.png';
import instagramIcon from '../../assets/imagenes/instagram.png'
import githubIcon from '../../assets/imagenes/github.png'
import linkedinIcon from '../../assets/imagenes/linkedin.png'

// 2. ¡EL CAMBIO CLAVE! Importa el archivo .module.css a un objeto llamado 'styles'
import styles from './Footer.module.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    // 3. Usa el objeto 'styles' para aplicar cada clase.
    // Nota que 'site-footer' se convierte en styles['site-footer'] por el guión.
    <footer id="site-footer" className={styles.siteFooter}>
      <div className={styles.footerContent}>
        <div className={styles.footerLogo}>
          <img src={alejoLogo} alt="Logo Ajelo Bermudez" id="alejo-logo" className={styles.alejoLogo} />
        </div>
        <div className={styles.footerSocialLinks}>
          <a href="http://instagram.com/forjavoxel/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} title="Instagram Ajelo Bermudez">
             <img src={instagramIcon} alt="Ícono de Instagram" className={styles.socialIcon} />
          </a>
          <a href="https://github.com/AjeloCoder?tab=repositories" target="_blank" rel="noopener noreferrer" className={styles.socialLink} title="GitHub AjeloCoder">
             <img src={githubIcon} alt="Ícono de GitHub" className={styles.socialIcon} />
          </a>
          <a href="https://www.linkedin.com/in/ajelobermudez/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} title="LinkedIn Ajelo Bermudez">
             <img src={linkedinIcon} alt="Ícono de LinkedIn" className={styles.socialIcon} />
          </a>
        </div>
        <div className={styles.footerCopyright}>
          <p>© {currentYear} Ajelo Bermúdez. Todos los derechos reservados.</p>

        </div>
      </div>
    </footer>
  );
}

export default Footer;