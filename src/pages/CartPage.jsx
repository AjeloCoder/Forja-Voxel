import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Nuestro hook mágico
import { FaTrash } from 'react-icons/fa'; // Un ícono para eliminar
import styles from './CartPage.module.css';

function CartPage() {
  const { items, removeItem, addItem } = useCart(); // Obtenemos todo lo que necesitamos del contexto

  // Calculamos el precio total
  const totalPrice = items.reduce((total, item) => {
    return total + item.quantity * item.price;
  }, 0);

  // Función placeholder para la finalización de la compra
  const handleCheckout = () => {
    alert('¡Gracias por tu compra! (Función de checkout en desarrollo)');
    // Aquí en el futuro podrías vaciar el carrito, enviar a una pasarela de pago, etc.
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
        {/* Lista de Items */}
        <div className={styles.itemsList}>
          {items.map(item => (
            <div key={item.id} className={styles.cartItem}>
              <img src={item.image} alt={item.name} className={styles.itemImage} />
              <div className={styles.itemDetails}>
                <h3 className={styles.itemName}>{item.name}</h3>
                <p className={styles.itemPrice}>
                  {item.quantity} x ${item.price.toFixed(2)}
                </p>
              </div>
              <div className={styles.itemActions}>
                <span className={styles.itemSubtotal}>
                  ${(item.quantity * item.price).toFixed(2)}
                </span>
                <button 
                  className={styles.removeButton}
                  onClick={() => removeItem(item.id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Resumen de la Compra */}
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