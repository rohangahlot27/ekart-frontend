import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
  // ✅ Fixed the selector to match your actual cart state structure
  const cartCount = useSelector((state) => state.cart?.cartItems?.length || 0);

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          E-Kart 🛒
        </Link>

        <div className="space-x-4">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/add" className="hover:underline">
            Add Product
          </Link>
          <Link to="/cart" className="hover:underline">
            Cart ({cartCount})
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
