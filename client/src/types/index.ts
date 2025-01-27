export interface BBLList {
  bbls: BBL[];
}

export interface BBL {
  _id: string;
  issuer: string;
  recipientName: string;
  recipientTeam: string;
  purpose: string;
  bblNo: string;
  issueDate: string;
  employeeId: string;
  amount: number;
  __v: number;
}
