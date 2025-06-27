import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/api';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetchProducts();
        setProducts(res.data.products);
      } catch (err) {
        console.error('Failed to fetch products:', err.message);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    `${product.title} ${product.brand}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">🛒 E-Kart Products</h1>

      <input
        type="text"
        placeholder="Search by title or brand"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6 p-2 border rounded w-full sm:w-1/2"
      />

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onDelete={(id) =>
                setProducts((prev) => prev.filter((p) => p._id !== id))
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;


