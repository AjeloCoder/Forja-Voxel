// src/componentes/products/ProductCard.jsx

import React from 'react';
import styles from './ProductCard.module.css';

// El componente recibe un objeto 'product' a través de las props
function ProductCard({ product }) {
  // Desestructuramos el objeto para acceder a sus propiedades más fácilmente
  const { name, price, image } = product;

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={image} alt={`Imagen de ${name}`} className={styles.productImage} />
      </div>
      <div className={styles.cardInfo}>
        <h3 className={styles.productName}>{name}</h3>
        <p className={styles.productPrice}>${price.toFixed(2)}</p>
      </div>
      <button className={styles.addToCartButton}>
        Añadir al Carrito
      </button>
    </div>
  );
}

export default ProductCard;