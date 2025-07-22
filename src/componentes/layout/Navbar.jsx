import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useCart } from "../../context/UseCart"; // Corregí la ruta a 'useCart'
import { useSettings } from '../../context/SettingsContext';
import { FaVolumeUp, FaVolumeMute, FaBars, FaTimes, FaShoppingCart } from 'react-icons/fa';
import logoIcon from '../../assets/imagenes/logo-icon.png';
import styles from './Navbar.module.css';

// Array "hardcodeado" con las categorías de tus productos
const categories = ['accesorios', 'gaming', 'decoracion', 'figuras'];

function Navbar() {
  const { isPlaying, toggleMusic } = useSettings();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { items } = useCart();
  
  const totalItemsInCart = items.reduce((sum, item) => sum + item.quantity, 0);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenus = () => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  };
  
  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <nav className={isHomePage ? styles.navbarTransparent : styles.navbarSolid}>
      <div className={styles.navContainer}>
        <Link to="/" className={styles.logoLink} onClick={closeMenus}>
          <img src={logoIcon} alt="Icono de Forja Vóxel" className={styles.logo} />
        </Link>
        
        {/* --- Menú de Navegación para Escritorio --- */}
        <ul className={styles.navLinksDesktop}>
          <li
            className={styles.dropdownContainer}
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <NavLink
              to="/productos"
              className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
              onClick={() => setIsDropdownOpen(false)}
            >
              Productos
            </NavLink>
            {isDropdownOpen && (
              <div className={styles.dropdownMenu}>
                <Link to="/productos" onClick={closeMenus}>Todos</Link>
                {/* --- LÓGICA CORREGIDA --- */}
                {/* Hacemos el map sobre nuestro array 'categories' */}
                {categories.map(category => (
                  <Link
                    key={category}
                    to={`/category/${category}`}
                    onClick={closeMenus}
                  >
                    {capitalize(category)}
                  </Link>
                ))}
              </div>
              
            )}
          </li>
          <li><NavLink to="/nosotros" className={({ isActive }) => isActive ? styles.active : ''}>Nosotros</NavLink></li>
          <li><NavLink to="/contacto" className={({ isActive }) => isActive ? styles.active : ''}>Contacto</NavLink></li>
        </ul>

        {/* --- Iconos a la derecha --- */}
        <div className={styles.rightIconsWrapper}>
            {isHomePage && (
              <button onClick={toggleMusic} className={styles.muteButton}>
                {isPlaying ? <FaVolumeUp /> : <FaVolumeMute />}
              </button>
            )}
            <Link to="/carrito" className={styles.cartIconContainer}>
              <FaShoppingCart />
              {totalItemsInCart > 0 && (
                <span className={styles.cartBadge}>{totalItemsInCart}</span>
              )}
            </Link>
            <div className={styles.hamburger} onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </div>
        </div>

      {/* --- Menú Móvil --- */}
      {isMobileMenuOpen && (
        <ul className={styles.navLinksMobile}>
          {/* Aquí podrías replicar la lógica del dropdown si quisieras en el futuro */}
          <li onClick={toggleMobileMenu}><NavLink to="/productos">Productos</NavLink></li>
          <li onClick={toggleMobileMenu}><NavLink to="/nosotros">Nosotros</NavLink></li>
          <li onClick={toggleMobileMenu}><NavLink to="/contacto">Contacto</NavLink></li>
        </ul>
      )}
      </div>
    </nav>
  );
}

export default Navbar;