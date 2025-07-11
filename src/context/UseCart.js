import { useContext } from 'react';
import { CartContext } from './CartContext';

export const useCart = () => {
  const context = useContext(CartContext);
  
  if (context === null) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  
  return context;
};