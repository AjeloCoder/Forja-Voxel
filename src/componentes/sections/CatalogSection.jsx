import React, { useState, useEffect } from 'react';
import styles from './CatalogSection.module.css';

// Importamos nuestras herramientas y componentes
import { getProducts, getProductsByCategory } from '../services/ProductService';
import ProductCard from '../ui/ProductCard';
import LoadingSpinner from '../ui/LoadingSpinner';

// Las categorías que antes teníamos en el Navbar
const categories = ['figuras', 'llaveros', 'juegos', 'accesorios'];

function CatalogSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('todos'); // Estado para el filtro

  useEffect(() => {
    setLoading(true);

    const fetchProducts = async () => {
      // Si la categoría seleccionada es 'todos', llamamos a getProducts, si no, a getProductsByCategory
      const asyncFunc = selectedCategory === 'todos'
        ? getProducts
        : () => getProductsByCategory(selectedCategory);

      try {
        const data = await asyncFunc();
        setProducts(data);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]); // ¡El efecto se re-ejecuta cada vez que cambia la categoría!

  return (
    // 'id="catalogo"' es el ancla para el botón "PRESS START"
    <section id="catalogo" className={styles.catalogSection}>
      <h2 className={styles.title}>Catálogo</h2>
      <p className={styles.subtitle}>Selecciona tu categoría y equípate</p>

      {/* --- Filtro de Categorías --- */}
      <div className={styles.filterContainer}>
        <button 
          onClick={() => setSelectedCategory('todos')}
          className={selectedCategory === 'todos' ? styles.active : ''}
        >
          Todos
        </button>
        {categories.map(cat => (
          <button 
            key={cat} 
            onClick={() => setSelectedCategory(cat)}
            className={selectedCategory === cat ? styles.active : ''}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* --- Grilla de Productos --- */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className={styles.productsGrid}>
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}

export default CatalogSection;