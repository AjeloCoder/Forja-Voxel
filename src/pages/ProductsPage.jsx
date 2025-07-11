import React, { useState, useEffect } from 'react'; 
import { useParams } from 'react-router-dom';
import ProductCard from '../componentes/ui/ProductCard';
import productsDataFromFile  from '../data/products.json';
import styles from './ProductsPage.module.css';
import Llavero from '../assets/imagenes/Llavero.jpeg'
import Figuras from '../assets/imagenes/Figuras.jpeg'
import Ilustracion from '../assets/imagenes/Ilustracion.jpeg'
import Soporte from '../assets/imagenes/Soporte.jpeg'



function ProductsPage() {
  const { categoryId } = useParams();
  
  const [displayedProducts, setDisplayedProducts] = useState([]);

  const [pageTitle, setPageTitle] = useState('');

  useEffect(() => {

    const getFilteredProducts = () => {
      const filtered = categoryId
        ? productsData.filter(p => p.category === categoryId)
        : productsData;
      
      setDisplayedProducts(filtered);

      const title = categoryId 
        ? categoryId.charAt(0).toUpperCase() + categoryId.slice(1) 
        : 'Todos nuestros productos';
      setPageTitle(title);
    };

    getFilteredProducts();

  }, [categoryId]); 

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>{pageTitle}</h1>
      {displayedProducts.length > 0 ? (
        <div className={styles.productsGrid}>
          {displayedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p>No se encontraron productos en esta categoría.</p>
      )}
    </div>
  );
}

const imageMap = {
  'Llavero.jpeg': Llavero,
  'Figuras.jpeg': Figuras,
  'Ilustracion.jpeg': Ilustracion,
  'Soporte.jpeg': Soporte,
};

const productsData = productsDataFromFile.map(product => {
  if (!imageMap[product.image]) {
    console.error(`¡Error! No se encontró la imagen para el producto: ${product.name}. Se esperaba el archivo llamado "${product.image}"`);
  }
  
  return {
    ...product,
    image: imageMap[product.image]
  };
});

export default ProductsPage;

