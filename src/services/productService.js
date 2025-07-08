import api from "../config/api";

export const addProduct = (formData) => api.post('/products', formData);
