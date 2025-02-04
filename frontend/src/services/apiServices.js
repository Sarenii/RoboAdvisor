import axios from 'axios';

// Create an axios instance with base config
const apiService = axios.create({
  baseURL: 'http://localhost:5000/api', // <-- Replace with your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optionally attach token to each request if present
apiService.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiService;
