import { db } from '../../firebase/config';
import { collection, getDocs, doc, getDoc, query, where, addDoc, serverTimestamp } from 'firebase/firestore';

export const getProducts = async () => {
  const productsCollection = collection(db, 'Products');
  const querySnapshot = await getDocs(productsCollection);
  const productsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return productsList;
};

export const getProductsByCategory = async (categoryId) => {
  const productsCollection = collection(db, 'Products');
  const q = query(productsCollection, where('category', '==', categoryId));
  const querySnapshot = await getDocs(q);
  const productsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return productsList;
};

export const getProductById = async (itemId) => {
  const productsCollection = collection(db, 'Products');
  const docRef = doc(productsCollection, itemId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  }
  return null;
};

export const createOrder = async (orderData) => {
  const ordersCollection = collection(db, 'orders'); // Apuntamos a la nueva colección
  try {
    const docRef = await addDoc(ordersCollection, {
      ...orderData,
      date: serverTimestamp() // Añadimos la fecha del servidor automáticamente
    });
    return docRef.id; // Devolvemos el ID de la nueva orden
  } catch (error) {
    console.error("Error al crear la orden:", error);
    throw error; // Propagamos el error para manejarlo en el componente
  }
};