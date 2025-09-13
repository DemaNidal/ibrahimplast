import axios from "axios";

export const API_URL = "http://localhost:5000/api";
const token = localStorage.getItem("user-token");

const api = axios.create({
  baseURL: API_URL,
  timeout: 1000,
  headers:{
    Authorization: `Bearer ${token}`,
  },
  withCredentials: true, // 🔑 allow cookies to be sent automatically

});

export default api;
