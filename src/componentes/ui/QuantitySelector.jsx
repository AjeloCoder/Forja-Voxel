import React from 'react';
import styles from './QuantitySelector.module.css';
import toast from 'react-hot-toast';

function QuantitySelector({ quantity, onDecrease, onIncrease }) {
  const handleAddItem = () => {
    addItem(product, 1);
    toast.success(`${product.name} añadido!`); // ¡Aquí está la magia!
  };
  return (
    <div className={styles.quantitySelector}>
      <button onClick={onDecrease} className={styles.button}>-</button>
      <span className={styles.quantity}>{quantity}</span>
      <button onClick={onIncrease} className={styles.button}>+</button>
    </div>
  );
}

export default QuantitySelector;