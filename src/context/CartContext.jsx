import React, { createContext, useReducer, useContext } from 'react';

// 1. Crear el Contexto
const CartContext = createContext();


function cartReducer(state, action) {
  // Encontramos el índice del item en el carrito, lo usaremos varias veces
  const itemIndex = state.items.findIndex(
    (item) => item.id === action.payload.id
  );
  const existingItem = state.items[itemIndex];
  let updatedItems;

  switch (action.type) {
    case 'ADD_ITEM': { // Usamos llaves para crear un scope local
      const { item, quantity } = action.payload;
      const itemIndex = state.items.findIndex((i) => i.id === item.id);
      
      if (itemIndex > -1) {
        // El item ya existe, actualizamos la cantidad
        const existingItem = state.items[itemIndex];
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + quantity,
        };
        updatedItems = [...state.items];
        updatedItems[itemIndex] = updatedItem;
      } else {
        // Item nuevo
        updatedItems = state.items.concat({ ...item, quantity: quantity });
      }
      return { ...state, items: updatedItems };
    }

    case 'REMOVE_ITEM': {
      updatedItems = state.items.filter((item) => item.id !== action.payload.id);
      return { ...state, items: updatedItems };
    }

    case 'DECREASE_QUANTITY': {
      // --- Lógica de búsqueda encapsulada aquí ---
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      // Si no encuentra el item (aunque no debería pasar), no hacemos nada
      if (itemIndex < 0) return state;

      const itemToDecrease = state.items[itemIndex];
      
      if (itemToDecrease.quantity === 1) {
        // Eliminar el item
        updatedItems = state.items.filter((item) => item.id !== action.payload.id);
      } else {
        // Decrementar la cantidad
        const updatedItem = { ...itemToDecrease, quantity: itemToDecrease.quantity - 1 };
        updatedItems = [...state.items];
        updatedItems[itemIndex] = updatedItem;
      }
      return { ...state, items: updatedItems };
    }

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const value = {
    items: state.items,
    // Modificamos addItem para ser más flexible
    addItem: (item, quantity) => dispatch({ type: 'ADD_ITEM', payload: { item, quantity } }),
    removeItem: (id) => dispatch({ type: 'REMOVE_ITEM', payload: { id } }),
    // Añadimos la nueva función para decrementar
    decreaseQuantity: (id) => dispatch({ type: 'DECREASE_QUANTITY', payload: { id } }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// ... useCart hook se mantiene igual ...
// 4. Crear un Hook personalizado para usar el contexto fácilmente
export function useCart() {
  return useContext(CartContext);
}