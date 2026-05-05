import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './config';

const CARTS_COLLECTION = 'carts';

export const cartService = {
  async saveCartToFirestore(uid, cartItems) {
    try {
      const cartRef = doc(db, CARTS_COLLECTION, uid);
      await setDoc(cartRef, {
        items: cartItems,
        updatedAt: serverTimestamp(),
      }, { merge: true });
    } catch (error) {
      console.error('Error saving cart to Firestore:', error);
      throw error;
    }
  },

  async getCartFromFirestore(uid) {
    try {
      const cartRef = doc(db, CARTS_COLLECTION, uid);
      const cartSnap = await getDoc(cartRef);
      return cartSnap.exists() ? cartSnap.data().items : [];
    } catch (error) {
      console.error('Error retrieving cart from Firestore:', error);
      return [];
    }
  },

  async deleteCartFromFirestore(uid) {
    try {
      const cartRef = doc(db, CARTS_COLLECTION, uid);
      await deleteDoc(cartRef);
    } catch (error) {
      console.error('Error deleting cart from Firestore:', error);
      throw error;
    }
  },

  listenToCartChanges(uid, callback) {
    try {
      const cartRef = doc(db, CARTS_COLLECTION, uid);
      const unsubscribe = onSnapshot(cartRef, (doc) => {
        if (doc.exists()) {
          callback(doc.data().items || []);
        } else {
          callback([]);
        }
      });
      return unsubscribe;
    } catch (error) {
      console.error('Error setting up cart listener:', error);
      throw error;
    }
  },
};
