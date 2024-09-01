import { Document } from "mongoose";
type Role = 'manager' | 'admin' | 'user'
export interface Users extends Document {
  email: string;
  password: string;
  name: string;
  image: string;
  role: Role;
  active: boolean;
  passwordChangedAt: Date | number;
  resetCode: string;
  resetCodeExpireTime: Date | number;
  resetCodeVerify: boolean
}