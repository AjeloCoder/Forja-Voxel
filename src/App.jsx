// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// ...otras importaciones...

// Importa tus nuevas páginas y componentes
import MainExperience from './pages/MainExperience'; // El nuevo nombre de HomePage
import ItemDetailPage from './pages/ItemDetailPage';
import NotFoundPage from './pages/NotFoundPage';

// Importa los componentes de layout si los vamos a usar globalmente
import Navbar from './componentes/layout/Navbar';
import Footer from './componentes/layout/Footer';

import './App.css';

// El componente que tiene acceso a la ubicación
function AppContent() {
  return (
    <div className="app-container">
      {/* Navbar y Footer ahora son fijos y viven fuera de las secciones */}
      <Navbar />

      <main>
        {/* El router ahora solo se preocupa de unas pocas rutas */}
        <Routes>
          <Route path="/" element={<MainExperience />} />
          <Route path="/item/:itemId" element={<ItemDetailPage />} />

          {/* Dejamos el catch-all por si acaso */}
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