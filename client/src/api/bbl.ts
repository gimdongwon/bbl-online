import axios from './axios';
import { BBLList } from '../types';

// BBL 리스트 가져오기
export const fetchBBLList = async (): Promise<BBLList> => {
  const response = await axios.get('/bbl/list'); // '/api/bbl' 경로는 baseURL에 포함됨
  return response.data;
};
