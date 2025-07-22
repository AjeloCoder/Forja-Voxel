import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { CartProvider } from './context/CartProvider.jsx';
import { SettingsProvider } from './context/SettingsContext.jsx'; // 1. Importar

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. Envolver CartProvider con SettingsProvider */}
    <SettingsProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </SettingsProvider>
  </React.StrictMode>
);