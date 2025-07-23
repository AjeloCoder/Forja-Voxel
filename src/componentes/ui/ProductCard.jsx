import { useCart } from '../../context/UseCart';
import styles from './ProductCard.module.css';
import React from 'react';
import { Link } from 'react-router-dom';

// Este componente ahora es súper "tonto". Solo muestra datos y es un link.
function ProductCard({ product }) {
  return (
    <Link to={`/item/${product.id}`} className={styles.cardLink}>
      <div className={styles.card}>
        {/* Usamos el fondo de imagen en lugar de <img> para mejor control */}
        <div 
            className={styles.cardImage} 
            style={{ backgroundImage: `url(${product.image})` }}
        />
        <div className={styles.cardContent}>
          <h3 className={styles.cardTitle}>{product.name}</h3>
          <p className={styles.cardDescription}>{product.description}</p>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;