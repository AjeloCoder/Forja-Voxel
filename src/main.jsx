import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Importaremos los estilos globales aquí
import App from './App';
import { CartProvider } from './context/CartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>
);