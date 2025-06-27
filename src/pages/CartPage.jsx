import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} from '../redux/cartSlice';
import axios from 'axios'; // ✅ import axios
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in to place an order');
      return navigate('/login');
    }

    try {
      // ✅ Send order to backend
      await axios.post(
        '/api/orders',
        {
          items: cartItems,
          total,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert('Order placed successfully!');
      dispatch(clearCart());
      navigate('/'); // or navigate to /orders page if you create one
    } catch (err) {
      console.error('Checkout failed:', err);
      alert('Failed to place order');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">🛍 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item._id} className="flex justify-between items-center border-b py-3">
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.brand}</p>
                <p className="text-lg">₹{item.price} × {item.quantity}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => dispatch(decreaseQty(item._id))} className="px-2 py-1 bg-gray-200">−</button>
                <span>{item.quantity}</span>
                <button onClick={() => dispatch(increaseQty(item._id))} className="px-2 py-1 bg-gray-200">+</button>
                <button onClick={() => dispatch(removeFromCart(item._id))} className="text-red-600">🗑</button>
              </div>
            </div>
          ))}

          <div className="mt-4">
            <p className="text-xl font-bold">Total: ₹{total}</p>
            <button
              onClick={() => dispatch(clearCart())}
              className="mt-2 mr-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              🧹 Clear Cart
            </button>
            <button
              onClick={handleCheckout}
              className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              ✅ Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
