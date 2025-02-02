import axios from './axios';

export const registerUser = async (data: {
  name: string;
  email: string;
  companyNo: string;
  password: string;
}): Promise<{ message: string }> => {
  const response = await axios.post('/auth/register', data);
  return response.data;
};

export const loginUser = async (data: {
  email: string;
  password: string;
}): Promise<{
  token: string;
  user: { name: string; email: string; companyNo: string; id: string };
}> => {
  const response = await axios.post('/auth/login', data);
  return response.data;
};

export const getUser = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get('/auth/me', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.user;
};
