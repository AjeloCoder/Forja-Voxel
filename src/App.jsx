// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Importa tus nuevas páginas y componentes
import MainExperience from './pages/MainExperience';
import ItemDetailPage from './pages/ItemDetailPage';
import NotFoundPage from './pages/NotFoundPage';

// Importa los componentes de layout
import Navbar from './componentes/layout/Navbar';
import Footer from './componentes/layout/Footer';
import { AuthModal } from './componentes/ui/AuthModal';

import './App.css';

// El componente que tiene acceso a la ubicación
function AppContent() {
  const location = useLocation();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isHomePage = location.pathname === '/';

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeAllMenus = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="app-container">
      <Navbar
        isHomePage={isHomePage}
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
        closeAllMenus={closeAllMenus}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

      <main>
        <Routes>
          <Route path="/" element={<MainExperience />} />
          <Route path="/item/:itemId" element={<ItemDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router basename="/Forja-Voxel">
      <AppContent />
    </Router>
  );
}

export default App;