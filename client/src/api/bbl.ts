import { privateInstance } from './axios';
import { BBLListType } from '../types';

interface BblListReqType {
  startDate: string;
  endDate: string;
  page: number;
}

// BBL 리스트 가져오기
export const fetchBBLList = async ({
  startDate,
  endDate,
  page,
}: BblListReqType): Promise<BBLListType> => {
  const response = await privateInstance.get('/bbl/list', {
    params: {
      startDate,
      endDate,
      page,
    },
  }); // '/api/bbl' 경로는 baseURL에 포함됨
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
  category: string; // 카테고리 필드 추가
}) => {
  const response = await privateInstance.post('/bbl/issue', data);
  return response.data;
};
