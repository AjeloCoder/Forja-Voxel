import { createContext } from 'react';
import { CART_ACTIONS } from "./CartActions"
export const CartContext = createContext(null);
export const initialCartState = {
  items: [],
};

export const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const { item, quantity } = action.payload;
      const itemIndex = state.items.findIndex((i) => i.id === item.id);
      
      if (itemIndex > -1) {
        const newItems = [...state.items];
        const existingItem = newItems[itemIndex];
        newItems[itemIndex] = { ...existingItem, quantity: existingItem.quantity + quantity };
        return { ...state, items: newItems };
      } else {
        const newItems = [...state.items, { ...item, quantity: quantity }];
        return { ...state, items: newItems };
      }
    }

    case CART_ACTIONS.DECREASE_QUANTITY: {
      const itemIndex = state.items.findIndex((i) => i.id === action.payload.id);
      if (itemIndex < 0) return state;

      const existingItem = state.items[itemIndex];
      if (existingItem.quantity === 1) {
        const newItems = state.items.filter((i) => i.id !== action.payload.id);
        return { ...state, items: newItems };
      } else {
        const newItems = [...state.items];
        newItems[itemIndex] = { ...existingItem, quantity: existingItem.quantity - 1 };
        return { ...state, items: newItems };
      }
    }

    case CART_ACTIONS.REMOVE_ITEM: {
      const newItems = state.items.filter((i) => i.id !== action.payload.id);
      return { ...state, items: newItems };
    }

    default:
      throw new Error(`Acción desconocida en cartReducer: ${action.type}`);
      
      case CART_ACTIONS.CLEAR_CART: {
        return { ...state, items: [] }; // Devuelve el estado con el array de items vacío
      }
    }

};