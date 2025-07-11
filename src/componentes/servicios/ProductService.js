import { db } from '../../firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';

export const getProducts = async () => {
  const productsCollection = collection(db, 'Products');
  const querySnapshot = await getDocs(productsCollection);
  
  const products = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  return products;
};

export const getProductsByCategory = async (categoryId) => {
  const productsCollection = collection(db, 'Products'); 
  const q = query(productsCollection, where('category', '==', categoryId));
  const querySnapshot = await getDocs(q);

  const products = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  return products;
};