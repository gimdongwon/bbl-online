import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // .env에서 API URL 가져오기
});

export default instance;
