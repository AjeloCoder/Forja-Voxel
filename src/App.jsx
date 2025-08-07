import React, { useEffect, useState } from 'react';
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
import ElTaller from './pages/ElTaller';
import './App.css';

// Componente intermediario para poder usar hooks de routing y contexto
function AppContent() {
  const location = useLocation(); 
  const isHomePage = location.pathname === '/';

   const { isPlaying, toggleMusic } = useSettings();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const closeAllMenus = () => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  };

   const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Si abrimos el menú hamburguesa, cerramos el de productos por si acaso
    if (!isMobileMenuOpen) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (!isHomePage && isPlaying) {
      toggleMusic();
    }
  }, [isHomePage, isPlaying, toggleMusic ]);

  return (
    <div className="app-container">
        {isHomePage && <div className="home-background-image" />}
      <Toaster position="bottom-right" toastOptions={{ /* ...tus opciones... */ }} />
        <Navbar 
        isHomePage={isHomePage} 
        isMobileMenuOpen={isMobileMenuOpen} 
        toggleMobileMenu={toggleMobileMenu}
        // Pasamos todo lo relacionado al dropdown
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
        closeAllMenus={closeAllMenus}
      />
      <main>
        <Routes>
          <Route 
            path="/" 
            element={<HomePage isMobileMenuOpen={isMobileMenuOpen} />} 
          />
          <Route path="/productos" element={<ProductsPage />} />
          <Route path="/category/:categoryId" element={<ProductsPage />} />
           <Route path="/item/:itemId" element={<ItemDetailPage />} />
          <Route path="/taller" element={<ElTaller />} />
          <Route path="/contacto" element={<div><h1>Encargos Especiales</h1> </div>} /> 
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