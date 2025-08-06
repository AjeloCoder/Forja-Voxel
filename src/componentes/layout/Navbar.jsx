import React, { useRef, useEffect } from 'react'; // Necesitamos esto de vuelta
import { Link, NavLink, } from 'react-router-dom';
import { useCart } from "../../context/UseCart"; // Corregí la ruta a 'useCart'
import { useSettings } from '../../context/SettingsContext';
import { FaVolumeUp, FaVolumeMute, FaBars, FaTimes, FaShoppingCart } from 'react-icons/fa';
import logoIcon from '../../assets/imagenes/logo-icon.png';
import styles from './Navbar.module.css';

const categories = ['accesorios', 'gaming', 'decoracion', 'figuras'];

function Navbar({ 
  isHomePage, 
  isMobileMenuOpen, 
  toggleMobileMenu, 
  isDropdownOpen, 
  setIsDropdownOpen, 
  closeAllMenus
}) {
  const logoRef = useRef(null);

  // Mantenemos el useEffect para el brillo que sigue al cursor
  useEffect(() => {
    if (!isHomePage || !logoRef.current) return;
    const logo = logoRef.current;
    const handleMouseMove = (e) => {
      const rect = logo.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      logo.style.setProperty('--mouse-x', `${x}px`);
      logo.style.setProperty('--mouse-y', `${y}px`);
    };
    logo.addEventListener('mousemove', handleMouseMove);
    return () => logo.removeEventListener('mousemove', handleMouseMove);
  }, [isHomePage]);
  const { items } = useCart();
  const totalItemsInCart = items.reduce((sum, item) => sum + item.quantity, 0);

  const { isPlaying, toggleMusic } = useSettings(); 
  
   const closeMenus = closeAllMenus;
  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
     <nav className={`${styles.navbarWrapper} ${isHomePage ? styles.navbarTransparent : styles.navbarSolid}`}>
      <div className={styles.navContainer}>
        <Link to="/" className={styles.logoLink} onClick={closeMenus} ref={logoRef}>
        <div className={styles.glassOverlay}></div> {/* Div para el overlay */}
            <div className={styles.pixelShine}></div> {/* Div para el destello */}
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
              onClick={closeMenus} 
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
          <li><NavLink to="/nosotros" onClick={closeMenus} className={({ isActive }) => isActive ? styles.active : ''}>El Taller</NavLink></li>
          <li><NavLink to="/contacto" onClick={closeMenus} className={({ isActive }) => isActive ? styles.active : ''}>Encargos Especiales</NavLink></li>
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
          <li onClick={toggleMobileMenu}><NavLink to="/nosotros">El Taller</NavLink></li>
          <li onClick={toggleMobileMenu}><NavLink to="/contacto">Encargos Especiales</NavLink></li>
        </ul>
      )}
      </div>
    </nav>
  );
}

export default Navbar;