import { privateInstance } from './axios';
import { BBLListType } from '../types';

// BBL 리스트 가져오기
export const fetchBBLList = async (): Promise<BBLListType> => {
  const response = await privateInstance.get('/bbl/list'); // '/api/bbl' 경로는 baseURL에 포함됨
  return response.data;
};

// BBL 발행
export const issueBBL = async (data: {
  recipientName: string;
  recipientTeam: string;
  recipientId: string;
  purpose: string;
  amount: number;
  issuerId: string;
}) => {
  const response = await privateInstance.post('/bbl/issue', data);
  return response.data;
};
