import axios from "axios";

export const API_URL = "http://192.168.1.7:5000/api";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // 🔑 allow cookies to be sent automatically
});

export default api;
