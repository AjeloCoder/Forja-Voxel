import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './componentes/layout/Navbar';
import Footer from './componentes/layout/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import ItemDetailPage from './pages/ItemDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import { useSettings } from './context/SettingsContext';

// Importamos los estilos
import './App.css';

// Componente intermediario para poder usar hooks de routing y contexto
function AppContent() {
  const location = useLocation();
  const { isPlaying, toggleMusic } = useSettings(); // Usamos nuestro nuevo hook
  
  const isHomePage = location.pathname === '/';

  // Efecto para aplicar el fondo al body
  useEffect(() => {
    if (isHomePage) {
      document.body.classList.add('home-background');
    }
    return () => {
      document.body.classList.remove('home-background');
    };
  }, [isHomePage]);

  // Efecto para pausar la música al salir de la HomePage
  useEffect(() => {
    if (!isHomePage && isPlaying) {
      toggleMusic();
    }
  }, [isHomePage, isPlaying, toggleMusic]);

  return (
    <div className="app-container">
      <Toaster position="bottom-right" toastOptions={{ /* ...tus opciones... */ }} />
      <Navbar /> {/* Ya no necesita pasar props de música */}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/productos" element={<ProductsPage />} />
          <Route path="/category/:categoryId" element={<ProductsPage />} />
           <Route path="/item/:itemId" element={<ItemDetailPage />} />
          <Route path="/nosotros" element={<div><h1>El Taller</h1></div>} />
          <Route path="/contacto" element={<div><h1>Encargos Especiales</h1></div>} />
          <Route path="/carrito" element={<CartPage />} />
           <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer isHomePage={isHomePage} />
    </div>
  );
}

// El componente principal que solo se encarga del Router
function App() {
  return (
    <Router basename="/Forja-Voxel">
      <AppContent />
    </Router>
  );
}

export default App;