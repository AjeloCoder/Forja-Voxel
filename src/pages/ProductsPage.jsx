import React from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../componentes/ui/ProductCard';
import productsData from '../data/products.json';
import styles from './ProductsPage.module.css';

function ProductsPage() {
  // useParams nos permite leer parámetros de la URL, como :categoryId
  const { categoryId } = useParams();

  const filteredProducts = categoryId
    ? productsData.filter(p => p.category === categoryId)
    : productsData;
  
  // Título dinámico
  const pageTitle = categoryId 
    ? categoryId.charAt(0).toUpperCase() + categoryId.slice(1) 
    : 'Todos nuestros productos';

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>{pageTitle}</h1>
      {filteredProducts.length > 0 ? (
        <div className={styles.productList}>
          {filteredProducts.map(product => (
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