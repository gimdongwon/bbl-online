import { publicInstance, privateInstance } from './axios';

export const registerUser = async (data: {
  name: string;
  email: string;
  companyNo: string;
  password: string;
}): Promise<{ message: string }> => {
  const response = await publicInstance.post('/auth/register', data);
  return response.data;
};

export const loginUser = async (data: {
  email: string;
  password: string;
}): Promise<{
  token: string;
  user: { name: string; email: string; companyNo: string; id: string };
}> => {
  const response = await publicInstance.post('/auth/login', data);
  return response.data;
};

export const getUser = async () => {
  const response = await privateInstance.get('/auth/me');
  return response.data.user;
};

export const getSearchUser = async (name: string) => {
  const response = await privateInstance.get('/auth/users', {
    params: { name },
  });
  return response.data.users;
};
