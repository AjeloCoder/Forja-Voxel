import React from 'react';
import ProductCard from '../componentes/ui/ProductCard';
import productsDataFromFile  from '../data/products.json';
import styles from './ProductsPage.module.css';
import Llavero from '../assets/imagenes/Llavero.jpeg'
import Figuras from '../assets/imagenes/Figuras.jpeg'
import Ilustracion from '../assets/imagenes/Ilustracion.jpeg'
import Soporte from '../assets/imagenes/Soporte.jpeg'

const imageMap = {
  'Llavero.jpeg': Llavero,
  'Figuras.jpeg': Figuras,
  'Ilustracion.jpeg': Ilustracion,
  'Soporte.jpeg': Soporte,
};

console.log('Datos cargados del JSON:', productsDataFromFile);
console.log('Mapa de imágenes construido:', imageMap);
// 4. Prepara los datos finales: combina la info del JSON con las imágenes correctas.
//    Usamos .map() para crear un nuevo array donde la propiedad 'image' es el módulo importado, no solo el string.
const productsData = productsDataFromFile.map(product => {
  // Para cada producto, comprobamos si su imagen existe en nuestro mapa
  if (!imageMap[product.image]) {
    console.error(`¡Error! No se encontró la imagen para el producto: ${product.name}. Se esperaba el archivo llamado "${product.image}"`);
  }
  
  return {
    ...product,
    image: imageMap[product.image] // Asigna la imagen importada correcta
  };
});

export default function ProductsPage() {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Nuestros Productos</h1>
      
      <div className={styles.productsGrid}>
        {/* 5. El resto del código no cambia. Sigue mapeando sobre 'productsData' como antes. */}
        {productsData.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
