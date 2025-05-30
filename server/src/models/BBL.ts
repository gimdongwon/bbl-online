import mongoose, { Schema, Document } from 'mongoose';

export interface BBLType extends Document {
  recipientName: string; // 대상자 이름
  recipientTeam: string; // 대상자 팀
  recipientId: string; // 대상자 사번
  purpose: string; // 발행 목적
  issuerId: string; // 발행인 사번
  amount: number; // 금액
  bblNo: string; // BBL 번호
  issueDate: Date; // 발행일
  category: string; // 카테고리 (선택적)
}

const BBLSchema: Schema = new Schema({
  recipientName: { type: String, required: true },
  recipientTeam: { type: String, required: true },
  recipientId: { type: String, required: true }, // 대상자 사번
  purpose: { type: String, required: true },
  issuerId: { type: String, required: true },
  amount: { type: Number, required: true },
  bblNo: { type: String, required: true, unique: true }, // 중복 방지
  issueDate: { type: Date, required: true },
  category: { type: String, required: true }, // 카테고리 필드 추가, 기본값은 '일반'
});

export default mongoose.model<BBLType>('BBL', BBLSchema);
