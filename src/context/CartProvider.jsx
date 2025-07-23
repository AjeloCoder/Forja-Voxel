import React, { useReducer, useMemo } from 'react';
import { CART_ACTIONS } from './CartActions';
import { CartContext, cartReducer, initialCartState } from './CartContext';
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

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