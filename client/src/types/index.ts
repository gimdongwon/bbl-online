export interface BBLListType {
  bbls: BBLType[];
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
}
