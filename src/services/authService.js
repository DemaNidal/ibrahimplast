import axios from 'axios';
import api from '../config/api'; 


axios.defaults.withCredentials = true;

export const login = async (username, password) => {
  try {

    const res = await api.post('/login', {
      username,
      password,
    });
    localStorage.setItem('user-token', res.data.token);
    return res.data; // لازم يرجع { token: "...", user: {...} }
  } catch (error) {
    throw error.response?.data || error;   
  }
};