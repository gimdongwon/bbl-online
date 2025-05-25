export interface BBLListType {
  bbls: BBLType[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
}

export interface BBLType {
  _id: string;
  issuerId: string;
  issuerName: string;
  recipientName: string;
  recipientTeam: string;
  purpose: string;
  bblNo: string;
  issueDate: string;
  employeeId: string;
  amount: number;
  category: string; // 카테고리 필드 추가
}
