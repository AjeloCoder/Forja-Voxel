import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/UseCart';
import { useAuth } from '../context/useAuth';
import { FaTrash } from 'react-icons/fa';
import styles from './CartPage.module.css';
import QuantitySelector from '../componentes/ui/QuantitySelector'
import { createOrder } from '../componentes/services/ProductService';
import toast from 'react-hot-toast';

function CartPage() {
  const { items, removeItem, addItem, decreaseQuantity, clearCart } = useCart();
  const { isAuthenticated, userData, user } = useAuth();
  const navigate = useNavigate();

  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleRemove = (itemId, itemName) => {
    removeItem(itemId);
    toast.error(`${itemName} eliminado.`, { icon: '🗑️' });
};
  const totalPrice = items.reduce((total, item) => {
    return total + item.quantity * item.price;
  }, 0);


   const handleCheckout = async () => {
    setIsCheckingOut(true);

    // Check if user is authenticated
    if (!isAuthenticated || !userData) {
      toast.error('Debes iniciar sesión para completar la compra');
      setIsCheckingOut(false);
      return;
    }

    // Usar datos del usuario autenticado
    const buyerData = {
      name: userData.nombre || user?.email?.split('@')[0] || 'Cliente',
      email: user?.email || '',
      address: userData.dirección || 'No especificada'
    };

    // Preparamos los items de la orden de forma simplificada
    const orderItems = items.map(item => ({
      id: item.id,
      title: item.name,
      price: item.price,
      quantity: item.quantity,
    }));

    // El objeto final de la orden
    const order = {
      buyer: buyerData,
      items: orderItems,
      total: totalPrice,
    };

    try {
      const orderId = await createOrder(order);
      
      // ¡TODO SALIÓ BIEN!
      clearCart();
      toast.success(`¡Gracias por tu compra! Tu orden es #${orderId.substring(0, 6)}`);
      
      // Redirigimos al usuario al home después de 3 segundos
      setTimeout(() => {
        navigate('/');
      }, 3000);

    } catch (error) {
      toast.error('Hubo un error al procesar tu orden. Intenta de nuevo.');
    } finally {
      setIsCheckingOut(false); // Oculta el feedback de carga
    }
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
             <button 
          className="pixel-button" 
          onClick={handleCheckout} 
          disabled={isCheckingOut} // Se deshabilita mientras se procesa
          style={{width: '100%'}}
        >
          {isCheckingOut ? 'Forjando Orden...' : 'Finalizar Compra'}
        </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;