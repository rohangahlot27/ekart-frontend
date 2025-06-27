import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice'; // ✅ import action

const ProductCard = ({ product, onDelete }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // ✅ for Redux

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart(product)); // ✅ add product to cart
    alert(`${product.title} added to cart`);
  };

  return (
    <div
      className="border p-4 rounded shadow hover:shadow-lg cursor-pointer"
      onClick={() => navigate(`/product/${product._id}`)}
    >
      <img src={product.image} alt={product.title} className="h-40 w-full object-contain mb-2" />
      <h3 className="text-lg font-semibold">{product.title}</h3>
      <p className="text-gray-600">₹{product.price}</p>
      <p className="text-sm text-gray-400">{product.brand}</p>

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          onClick={handleAddToCart}
          className="bg-blue-600 text-white px-3 py-1 text-sm rounded hover:bg-blue-700"
        >
          🛒 Add to Cart
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/edit/${product._id}`);
          }}
          className="bg-yellow-500 text-white px-3 py-1 text-sm rounded hover:bg-yellow-600"
        >
          ✏️ Edit
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            const confirmDelete = window.confirm('Are you sure you want to delete this product?');
            if (confirmDelete && onDelete) onDelete(product._id);
          }}
          className="bg-red-600 text-white px-3 py-1 text-sm rounded hover:bg-red-700"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default ProductCard;




