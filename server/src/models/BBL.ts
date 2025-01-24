import mongoose, { Schema, Document } from 'mongoose';

export interface IBBL extends Document {
  issuer: string; // 발행인 이름
  recipientName: string; // 대상자 이름
  recipientTeam: string; // 대상자 팀
  purpose: string; // 발행 목적
  bblNo: string; // BBL 번호
  issueDate: Date; // 발행일
  employeeId: string; // 사번
  amount: number; // 금액
}

const BBLSchema: Schema = new Schema({
  issuer: { type: String, required: true },
  recipientName: { type: String, required: true },
  recipientTeam: { type: String, required: true },
  purpose: { type: String, required: true },
  bblNo: { type: String, required: true, unique: true }, // 중복 방지
  issueDate: { type: Date, required: true },
  employeeId: { type: String, required: true },
  amount: { type: Number, required: true },
});

export default mongoose.model<IBBL>('BBL', BBLSchema);
