import axios from 'axios';
import { API_URL } from '../config/api'; 



export const login = async (username, password) => {
  try {
    const res = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });
    return res.data; // لازم يرجع { token: "...", user: {...} }
  } catch (error) {
    throw error.response?.data || error;
  }
};