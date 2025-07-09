import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './componentes/layout/Navbar';
import HomePage from './pages/HomePage'; 
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          {/* Aquí definiremos las rutas a nuestras páginas */}
         <Route path="/" element={<HomePage />} />
         <Route path="/productos" element={<ProductsPage />} />
          <Route path="/category/:categoryId" element={<ProductsPage />} />
          <Route path="/nosotros" element={<div><h1>Página Sobre Nosotros</h1></div>} />
          <Route path="/contacto" element={<div><h1>Página de Contacto</h1></div>} />
          <Route path="/carrito" element={<CartPage />} />
        </Routes>
      </main>
      {/* Podríamos añadir un Footer aquí en el futuro */}
    </Router>
  );
}

export default App;