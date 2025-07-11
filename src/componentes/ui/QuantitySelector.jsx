import styles from './QuantitySelector.module.css';


function QuantitySelector({ quantity, onDecrease, onIncrease }) {
  return (
    <div className={styles.quantitySelector}>
      <button onClick={onDecrease} className={styles.button}>-</button>
      <span className={styles.quantity}>{quantity}</span>
      <button onClick={onIncrease} className={styles.button}>+</button>
    </div>
  );
}


export default QuantitySelector;