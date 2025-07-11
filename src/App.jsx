import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './componentes/layout/Navbar';
import HomePage from './pages/HomePage'; 
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import Footer from './componentes/layout/Footer';

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
         <Route path="/" element={<HomePage />} />
         <Route path="/productos" element={<ProductsPage />} />
          <Route path="/category/:categoryId" element={<ProductsPage />} />
          <Route path="/nosotros" element={<div><h1>Página Sobre Nosotros</h1></div>} />
          <Route path="/contacto" element={<div><h1>Página de Contacto</h1></div>} />
          <Route path="/carrito" element={<CartPage />} />
        </Routes>
      </main>

      <Footer/ >
      
    </Router>
  );
}

export default App;