import styles from './ProductCard.module.css';


function ProductCard({ product }) {
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