// services/productService.js
import api from '../config/api';
import { buildQuery }  from '../utils/buildQuery';

export const createProduct = (formData) => {
  return api.post('/products', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const fetchAllProducts  = (formData) => {
  return api.get('/allproducts', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const fetchProductById = (productId) => {
  return api.get(`/products/${productId}`);
};

export const fetchProductByTerm = (term) => {
  return api.get(`/search`, {
    params: { term },
  });
};


export const fetchProductByBarcode =(barcode) => {
  return api.get(`/search/barcode`, {
    params: {barcode},
  });
};

export const searchProducts = async (filters, searchTerm, lookups) => {
  const query = buildQuery(filters, searchTerm, lookups);
  if (!query) return [];
  const res = await api.get(`/search?${query}`);
  return Array.isArray(res.data) ? res.data : [res.data];
};

