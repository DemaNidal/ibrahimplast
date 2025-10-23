import api from "../config/api";

// Fetch all movements by product ID
export const getMovementsByProduct = (productId) =>
  api.get(`/movements/${productId}`);

// Add a new movement
export const addMovement = (movementData) =>
  api.post(`/movements`, movementData);