import axios from './axios';

export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
}): Promise<{ message: string }> => {
  const response = await axios.post('/auth/register', data);
  return response.data;
};
