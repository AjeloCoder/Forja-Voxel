import { Link } from 'react-router-dom';
import { useCart } from '../context/UseCart';
import { FaTrash } from 'react-icons/fa';
import styles from './CartPage.module.css';
import QuantitySelector from '../componentes/ui/QuantitySelector'
import toast from 'react-hot-toast';

function CartPage() {
  const { items, removeItem, addItem, decreaseQuantity  } = useCart(); 
  const handleRemove = (itemId, itemName) => {
    removeItem(itemId);
    toast.error(`${itemName} eliminado.`, { icon: '🗑️' });
};
  const totalPrice = items.reduce((total, item) => {
    return total + item.quantity * item.price;
  }, 0);


  const handleCheckout = () => {
    alert('¡Gracias por tu compra! (Función de checkout en desarrollo)');
    
  };

  // ---- Vista para Carrito Vacío ----
  if (items.length === 0) {
    return (
      <div className={`${styles.pageContainer} ${styles.emptyCartContainer}`}>
        <h1 className={styles.pageTitle}>Tu Carrito está Vacío</h1>
        <p>Parece que aún no has forjado ninguna idea. ¡Vuelve a nuestros productos!</p>
        <Link to="/productos" className="pixel-button">
          Ver Productos
        </Link>
      </div>
    );
  }

  // ---- Vista para Carrito con Productos ----
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Tu Carrito</h1>
      <div className={styles.cartLayout}>
        <div className={styles.itemsList}>
          {items.map(item => (
            <div key={item.id} className={styles.cartItem}>
              <img src={item.image} alt={item.name} className={styles.itemImage} />
              <div className={styles.itemDetails}>
                <h3 className={styles.itemName}>{item.name}</h3>
                <p className={styles.itemPrice}>
                  {item.quantity} x ${item.price.toFixed(2)}
                </p>
                  <QuantitySelector
                  quantity={item.quantity}
                    onDecrease={() => decreaseQuantity(item.id)}
                    onIncrease={() => addItem(item, 1)}
                />
              </div>
              <div className={styles.itemActions}>
                <span className={styles.itemSubtotal}>
                  ${(item.quantity * item.price).toFixed(2)}
                </span>
                <button className={styles.removeButton} onClick={() => handleRemove(item.id, item.name)}>
                <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>

        
        <div className={styles.summary}>
          <h2>Resumen de la Forja</h2>
          <div className={styles.summaryRow}>
            <span>Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Envío</span>
            <span>Gratis</span>
          </div>
          <div className={`${styles.summaryRow} ${styles.totalRow}`}>
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <button className="pixel-button" onClick={handleCheckout} style={{width: '100%'}}>
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;