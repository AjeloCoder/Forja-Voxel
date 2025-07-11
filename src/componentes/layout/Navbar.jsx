import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from "../../context/UseCart"
import logoIcon from '../../assets/imagenes/logo-icon.png';
import { FaBars, FaTimes, FaShoppingCart } from 'react-icons/fa';
import styles from './Navbar.module.css';

const hardcodedCategories = ['accesorios', 'gaming', 'decoracion', 'figuras'];

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
  
  const { items } = useCart();
  const totalItemsInCart = items.reduce((sum, item) => sum + item.quantity, 0);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMenus = () => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  }

  const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <Link to="/" className={styles.logoLink} onClick={closeMenus}>
          <img src={logoIcon} alt="Icono de Forja Vóxel" className={styles.logo} />
        </Link>
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
                <Link to="/productos" onClick={closeMenus} aria-label="Ver todos los productos">Todos</Link>
                {hardcodedCategories.map(category => (
                  <Link 
                    key={category} 
                    to={`/category/${category}`} 
                    onClick={closeMenus}
                    aria-label={`Ver productos de la categoría ${category}`}
                  >
                    {capitalize(category)}
                  </Link>
                ))}
              </div>
            )}
          </li>
          <li><NavLink to="/nosotros" className={({ isActive }) => isActive ? styles.active : ''} aria-label="Ir a la página sobre nosotros">Nosotros</NavLink></li>
          <li><NavLink to="/contacto" className={({ isActive }) => isActive ? styles.active : ''} aria-label="Ir a la página de contacto">Contacto</NavLink></li>
        </ul>

        <div className={styles.iconsContainer}>
          <Link to="/carrito" className={styles.cartIconContainer} aria-label="Ver carrito de compras">
            <FaShoppingCart />
            {totalItemsInCart > 0 && (
              <span className={styles.cartBadge}>{totalItemsInCart}</span>
            )}
          </Link>
          <div className={styles.hamburger} onClick={toggleMobileMenu} aria-label="Abrir o cerrar menú de navegación">
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <ul className={styles.navLinksMobile}>
          <li onClick={toggleMobileMenu}><NavLink to="/productos" className={({ isActive }) => isActive ? styles.active : ''}>Productos</NavLink></li>
          <li onClick={toggleMobileMenu}><NavLink to="/nosotros" className={({ isActive }) => isActive ? styles.active : ''}>Nosotros</NavLink></li>
          <li onClick={toggleMobileMenu}><NavLink to="/contacto" className={({ isActive }) => isActive ? styles.active : ''}>Contacto</NavLink></li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;