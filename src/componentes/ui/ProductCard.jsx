import React from 'react';
import { useCart } from '../../context/CartContext';
import styles from './ProductCard.module.css';
import QuantitySelector from './QuantitySelector';
import toast from 'react-hot-toast';

function ProductCard({ product }) {
  
  const { items, addItem, decreaseQuantity } = useCart();
  const itemInCart = items.find(item => item.id === product.id);
 const handleAddItem = () => {
    addItem(product, 1);
    toast.success(`${product.name} añadido!`);;
};
const handleIncrease = () => {
    addItem(product, 1);
    toast.success(`+1 ${product.name}`);
  };

  const handleDecrease = () => {
    decreaseQuantity(product.id);
    toast.error(`-1 ${product.name}`);
  };

  return (
    <div className={styles.card}>
      <img src={product.image} alt={product.name} className={styles.cardImage} />
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{product.name}</h3>
        <p className={styles.cardDescription}>{product.description}</p>
        <div className={styles.cardFooter}>
          <span className={styles.cardPrice}>${product.price.toFixed(2)}</span>
          {itemInCart ? (
               <QuantitySelector
            quantity={itemInCart.quantity}
            onDecrease={handleDecrease} 
            onIncrease={handleIncrease}
          />
          ) : (
            <button className="pixel-button" onClick={handleAddItem}>
              Agregar
            </button>
          )}

        </div>
      </div>
    </div>
  );
}

export default ProductCard;