import axios from 'axios';

// Use environment variable for base URL (set in .env and Vercel)
const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

export const fetchProducts = () => API.get('/products');
export const createProduct = (data) => API.post('/products', data);
export const updateProduct = (id, data) => API.put(`/products/${id}`, data);
export const deleteProduct = (id) => API.delete(`/products/${id}`);
export const fetchProductById = (id) => API.get(`/products/${id}`);
