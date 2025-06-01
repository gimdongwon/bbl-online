import axios from 'axios';

export const publicInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // .env에서 API URL 가져오기
});

export const privateInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const formInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

privateInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    config.headers['Content-Type'] = 'application/json';
  }
  return config;
});
formInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
