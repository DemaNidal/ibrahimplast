// services/productService.js
import api from '../config/api';

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
