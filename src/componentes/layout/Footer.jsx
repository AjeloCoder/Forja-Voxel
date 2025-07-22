import alejoLogo from '../../assets/imagenes/Logo-Alejo.png';
import { FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa';
import styles from './Footer.module.css';
import { useState } from 'react';


function Footer({ isHomePage }) { // Recibimos isHomePage
  const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (!isHomePage) {
    return (
      <footer id="site-footer" className={styles.footerSolid}>
        
      </footer>
    );
  }

   return (
    <footer id="site-footer" className={styles.footerTransparent}>
      <button onClick={toggleMenu} className={styles.personalLogo}>
        <img src={alejoLogo} alt="Logo de Alejo Bermúdez" />
      {isMenuOpen && (
        <div className={styles.socialMenu}>
          <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
          <a href="https://github.com/AjeloCoder" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
          <a href="http://instagram.com/forjavoxel/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
        </div>
      )}
      </button>
    </footer>
  );
}


export default Footer;

