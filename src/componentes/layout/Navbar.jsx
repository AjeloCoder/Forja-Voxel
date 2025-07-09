import React, { useState } from 'react';
// ...otras importaciones
import styles from './Navbar.module.css';
import { Link, NavLink } from 'react-router-dom';

// Importamos las categorías desde nuestro archivo de productos
import productsData from '../../data/products.json';
import { useCart } from '../../context/CartContext';
import logoIcon from '../../assets/imagenes/logo-icon.png'
import { FaBars, FaTimes, FaShoppingCart } from 'react-icons/fa';

// Obtenemos una lista única de categorías
const categories = [...new Set(productsData.map(p => p.category))];

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Nuevo estado para el dropdown de productos
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

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        {/* Logo que lleva al inicio y cierra menús */}
        <Link to="/" className={styles.logoLink} onClick={closeMenus}>
          <img src={logoIcon} alt="Icono de Forja Vóxel" className={styles.logo} />
        </Link>

        {/* Menú de Navegación para Desktop */}
        <ul className={styles.navLinksDesktop}>
          {/* Elemento de Productos con Dropdown */}
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
                {categories.map(category => (
                  <Link 
                    key={category} 
                    to={`/category/${category}`} 
                    onClick={closeMenus}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Link>
                ))}
              </div>
            )}
          </li>
          <li><NavLink to="/nosotros" className={({ isActive }) => isActive ? styles.active : ''}>Nosotros</NavLink></li>
          <li><NavLink to="/contacto" className={({ isActive }) => isActive ? styles.active : ''}>Contacto</NavLink></li>
        </ul>

         {/* Iconos a la derecha (Carrito y Hamburguesa) */}
        <div className={styles.iconsContainer}>
          {/* Icono del Carrito */}
          <Link to="/carrito" className={styles.cartIconContainer}>
            <FaShoppingCart />
            {totalItemsInCart > 0 && (
              <span className={styles.cartBadge}>{totalItemsInCart}</span>
            )}
          </Link>

          {/* Icono de Hamburguesa (solo en móvil) */}
          <div className={styles.hamburger} onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </div>

      {/* Menú desplegable para Móvil */}
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