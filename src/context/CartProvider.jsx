import React, { useReducer, useMemo, useEffect, useRef } from 'react';
import { CART_ACTIONS } from './CartActions';
import { CartContext, cartReducer, initialCartState } from './CartContext';
import { useAuth } from './useAuth';
import { cartService } from '../firebase/cartService';

const GUEST_CART_KEY = 'forja_voxel_cart';

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);
  const { isAuthenticated, user } = useAuth();
  const unsubscribeRef = useRef(null);
  const saveTimeoutRef = useRef(null);

  // Load cart from localStorage on mount (for guests)
  useEffect(() => {
    const savedCart = localStorage.getItem(GUEST_CART_KEY);
    if (savedCart) {
      try {
        const items = JSON.parse(savedCart);
        dispatch({ type: CART_ACTIONS.SYNC_CART, payload: items });
      } catch (error) {
        console.error('Error parsing saved cart:', error);
      }
    }
  }, []);

  // Load cart from Firestore when user authenticates
  useEffect(() => {
    if (isAuthenticated && user?.uid) {
      const loadAuthenticatedCart = async () => {
        try {
          // Get user's Firestore cart
          const firestoreItems = await cartService.getCartFromFirestore(user.uid);

          // Get guest cart from localStorage
          const guestCart = localStorage.getItem(GUEST_CART_KEY);
          const guestItems = guestCart ? JSON.parse(guestCart) : [];

          // Merge: Firestore items + any guest items (guest items take precedence for duplicates)
          const mergedItems = mergeCartItems(firestoreItems, guestItems);

          dispatch({ type: CART_ACTIONS.SYNC_CART, payload: mergedItems });

          // Save merged cart to Firestore
          if (mergedItems.length > 0) {
            await cartService.saveCartToFirestore(user.uid, mergedItems);
          }

          // Clear guest cart
          localStorage.removeItem(GUEST_CART_KEY);
        } catch (error) {
          console.error('Error loading authenticated cart:', error);
        }
      };

      loadAuthenticatedCart();

      // Set up real-time listener
      unsubscribeRef.current = cartService.listenToCartChanges(user.uid, (items) => {
        dispatch({ type: CART_ACTIONS.SYNC_CART, payload: items });
      });

      return () => {
        if (unsubscribeRef.current) {
          unsubscribeRef.current();
        }
      };
    }
  }, [isAuthenticated, user?.uid]);

  // Save cart to Firestore/localStorage when it changes
  useEffect(() => {
    if (state.items.length === 0) return;

    // Clear previous timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Debounce saves to avoid excessive writes
    saveTimeoutRef.current = setTimeout(() => {
      if (isAuthenticated && user?.uid) {
        cartService.saveCartToFirestore(user.uid, state.items).catch((error) => {
          console.error('Error saving cart to Firestore:', error);
        });
      } else {
        // Save to localStorage for guests
        localStorage.setItem(GUEST_CART_KEY, JSON.stringify(state.items));
      }
    }, 300);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [state.items, isAuthenticated, user?.uid]);

  // Clear Firestore cart on logout
  useEffect(() => {
    if (!isAuthenticated && user === null) {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    }
  }, [isAuthenticated, user]);

  const value = useMemo(() => ({
    items: state.items,
    addItem: (item, quantity) =>
      dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: { item, quantity } }),
    decreaseQuantity: (id) =>
      dispatch({ type: CART_ACTIONS.DECREASE_QUANTITY, payload: { id } }),
    removeItem: (id) =>
      dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: { id } }),
     clearCart: () =>
      dispatch({ type: CART_ACTIONS.CLEAR_CART }),
  }), [state.items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Helper function to merge cart items
function mergeCartItems(firestoreItems = [], guestItems = []) {
  const itemMap = new Map();

  // Add Firestore items first
  firestoreItems.forEach((item) => {
    itemMap.set(item.id, item);
  });

  // Merge guest items (guest items override quantities)
  guestItems.forEach((guestItem) => {
    if (itemMap.has(guestItem.id)) {
      // Item exists in both: use guest quantity (assume it's more recent)
      const existing = itemMap.get(guestItem.id);
      itemMap.set(guestItem.id, { ...existing, quantity: guestItem.quantity });
    } else {
      // New item from guest
      itemMap.set(guestItem.id, guestItem);
    }
  });

  return Array.from(itemMap.values());
}