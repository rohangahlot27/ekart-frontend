// src/pages/ProductDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../services/api';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await fetchProductById(id);
        setProduct(res.data);
      } catch (err) {
        console.error('Error loading product:', err.message);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  if (loading) return <p className="p-4">Loading product details...</p>;
  if (!product) return <p className="p-4 text-red-600">Product not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">{product.title}</h2>
      <img src={product.image} alt={product.title} className="w-64 h-64 object-contain mb-4" />
      <p className="text-lg"><strong>Brand:</strong> {product.brand}</p>
      <p className="text-lg"><strong>Price:</strong> ₹{product.price}</p>
      {product.description && <p className="mt-2">{product.description}</p>}
    </div>
  );
};

export default ProductDetails;
