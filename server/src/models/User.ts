import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  companyNo: string;
  password: string;
  team: string;
  grade: 'admin' | 'leader' | 'user';
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  companyNo: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  team: { type: String, required: true },
  grade: {
    type: String,
    enum: ['admin', 'leader', 'user'],
    default: 'user',
  },
});

export default mongoose.model<IUser>('User', UserSchema);
