import { Doctor } from './doctor';
import { User } from './user';

export type Appointment = {
  _id: string;
  userId: string;
  docId: string;
  slotDate: string;
  slotTime: string;
  userData: User;
  docData: Doctor;
  amount: number;
  date: number;
  cancelled: boolean;
  payment: boolean;
  isCompleted: boolean;
  __v: number;
};
