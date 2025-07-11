import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'
import Navbar from './componentes/layout/Navbar';
import HomePage from './pages/HomePage'; 
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import Footer from './componentes/layout/Footer';

function App() {
  return (
    <Router>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'var(--color-dark-grey)',
            color: 'var(--color-white)',
            border: '2px solid var(--color-red)',
            fontFamily: 'var(--font-pixel)',
            fontSize: '0.8rem',
          },
        }}
      />
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