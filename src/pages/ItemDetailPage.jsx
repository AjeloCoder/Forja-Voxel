import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../componentes/services/ProductService';
import LoadingSpinner from '../componentes/ui/LoadingSpinner';
import toast from 'react-hot-toast';
import QuantitySelector from '../componentes/ui/QuantitySelector';
import { useCart } from '../context/UseCart';
import styles from './ItemDetailPage.module.css';

function ItemDetailPage() {
  const { itemId } = useParams(); // Obtiene el ID de la URL
  const { addItem, decreaseQuantity, items } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const data = await getProductById(itemId);
      setProduct(data);
      setLoading(false);
    };
 if (itemId) {
      fetchProduct();
    }
  
}, [itemId]); // Se ejecuta cada vez que el itemId cambia

  const itemInCart = items.find(item => item.id === product?.id);

   const handleAddItem = () => {
    addItem(product, 1);
    toast.success(`${product.name} añadido al carrito!`);
  };

  const handleIncrease = () => {
    addItem(product, 1);
     toast.success(`+1 ${product.name}`);
  };

  const handleDecrease = () => {
    decreaseQuantity(product.id);
     toast.error(`-1 ${product.name}`);
  };
  if (loading) {
    return <LoadingSpinner />;
  }

  if (!product) {
    return <h2>Producto no encontrado</h2>; // O redirigir a la página 404
  }

  return (
    <div className={styles.pageContainer}>
         <div className={styles.imageWrapper}> 
        <img src={product.image} alt={product.name} className={styles.productImage} />
      </div>
      <div className={styles.detailsContainer}>
        <h1 className={styles.title}>{product.name}</h1>
        <p className={styles.price}>${product.price.toFixed(2)}</p>
        <p className={styles.description}>{product.description}</p>
        <div className={styles.actions}>
          {itemInCart ? (
            <QuantitySelector
               quantity={itemInCart.quantity}
              onDecrease={handleDecrease}
              onIncrease={handleIncrease}
            />
          ) : (
            <button className="pixel-button" onClick={() => addItem(product, 1)}>
              Añadir al Carrito
            </button>
          )}
            
        </div>
      </div>
    </div>
  );
}

export default ItemDetailPage;