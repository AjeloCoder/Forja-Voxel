import React, { useState, useEffect } from 'react'; 
import { useParams } from 'react-router-dom';
import ProductCard from '../componentes/ui/ProductCard';
import LoadingSpinner from "../componentes/ui/LoadingSpinner"
import { getProducts, getProductsByCategory } from "../componentes/servicios/ProductService"
import styles from './ProductsPage.module.css';



function ProductsPage() {
  const { categoryId } = useParams();
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageTitle, setPageTitle] = useState('');

  useEffect(() => {
       const fetchProducts = async () => {
      try {
        setLoading(true); 
        const data = categoryId
          ? await getProductsByCategory(categoryId)
          : await getProducts();
        
        setProducts(data);

        const title = categoryId 
          ? categoryId.charAt(0).toUpperCase() + categoryId.slice(1) 
          : 'Todos nuestros productos';
        setPageTitle(title);

      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchProducts();
  }, [categoryId]);
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>{pageTitle}</h1>
      {products.length > 0 ? (
        <div className={styles.productsGrid}>
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p>No se encontraron productos en esta categoría.</p>
      )}
    </div>
  );
}

export default ProductsPage;
