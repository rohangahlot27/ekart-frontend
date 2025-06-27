import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetails from './pages/ProductDetails';
import HomePage from './pages/HomePage';
import AddProduct from './pages/AddProduct';
import Navbar from './components/Navbar';
import EditProduct from './pages/EditProduct';
import CartPage from './pages/CartPage';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/edit/:id" element={<EditProduct />} />
            <Route path="/cart" element={<CartPage />} />
             <Route path="/login" element={<Login />} />
             <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>

        <footer className="text-center py-4 text-sm text-gray-500 border-t">
          © 2025 E-Kart. All rights reserved.
        </footer>
      </div>
    </Router>
  );
}

export default App;


