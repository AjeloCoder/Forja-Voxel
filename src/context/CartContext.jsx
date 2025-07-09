import React, { createContext, useReducer, useContext } from 'react';

// 1. Crear el Contexto
const CartContext = createContext();

// 2. Definir el estado inicial y el reducer
const initialState = {
  items: [],
};

// El reducer maneja la lógica de cómo cambia el estado
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      // Lógica para añadir item (incluyendo si ya existe)
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      const existingCartItem = state.items[existingCartItemIndex];
      let updatedItems;

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat({ ...action.payload, quantity: 1 });
      }
      return { ...state, items: updatedItems };

    case 'REMOVE_ITEM':
      // Lógica para remover item
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    default:
      return state;
  }
}

// 3. Crear el Provider Component
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const value = {
    items: state.items,
    addItem: (item) => dispatch({ type: 'ADD_ITEM', payload: item }),
    removeItem: (id) => dispatch({ type: 'REMOVE_ITEM', payload: { id } }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// 4. Crear un Hook personalizado para usar el contexto fácilmente
export function useCart() {
  return useContext(CartContext);
}