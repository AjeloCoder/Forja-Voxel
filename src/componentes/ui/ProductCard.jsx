import React from 'react';
import { useCart } from '../../context/CartContext';
import styles from './ProductCard.module.css';

function ProductCard({ product }) {
  const { addItem } = useCart();

  return (
    <div className={styles.card}>
      <img src={product.image} alt={product.name} className={styles.cardImage} />
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{product.name}</h3>
        <p className={styles.cardDescription}>{product.description}</p>
        <div className={styles.cardFooter}>
          <span className={styles.cardPrice}>${product.price.toFixed(2)}</span>
          <button className="pixel-button" onClick={() => addItem(product)}>
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;