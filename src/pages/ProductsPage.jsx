import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../componentes/ui/ProductCard';
import LoadingSpinner from '../componentes/ui/LoadingSpinner';
// ¡SOLO importamos las funciones que esta página necesita!
import { getProducts, getProductsByCategory } from '../componentes/services/ProductService';
import styles from './ProductsPage.module.css';

function ProductsPage() {
  const { categoryId } = useParams();
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageTitle, setPageTitle] = useState('');

  useEffect(() => {
    // Definimos una función asíncrona dentro del efecto
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let data;
        let title;
        
        // --- LÓGICA CORREGIDA Y CLARA ---
        if (categoryId) {
          // Si tenemos un ID de categoría, filtramos
          title = categoryId.charAt(0).toUpperCase() + categoryId.slice(1);
          data = await getProductsByCategory(categoryId);
        } else {
          // Si no, traemos todos los productos
          title = 'Todos nuestros productos';
          data = await getProducts();
        }
        
        setProducts(data);
        setPageTitle(title);

      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  if (loading) {
    return <LoadingSpinner />;
  }

  // El return se mantiene igual, ya está correcto.
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>{pageTitle}</h1>
      {products.length > 0 ? (
        <div className={styles.productsGrid}>
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p>No se encontraron productos en esta categoría.</p>
      )}
    </div>
  );
}

export default ProductsPage;
