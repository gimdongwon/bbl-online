import axios from './axios';
import { BBLList } from '../types';

// BBL 리스트 가져오기
export const fetchBBLList = async (): Promise<BBLList> => {
  const response = await axios.get('/bbl/list'); // '/api/bbl' 경로는 baseURL에 포함됨
  return response.data;
};

// BBL 발행
export const issueBBL = async (data: {
  recipientName: string;
  recipientTeam: string;
  purpose: string;
  amount: number;
  issuer: string;
}) => {
  const token = localStorage.getItem('token');
  const response = await axios.post('/bbl/issue', data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
