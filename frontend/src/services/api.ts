import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // adjust if your backend port is different
});

// add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
