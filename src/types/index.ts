import { User } from "firebase/auth";
import { DocumentData, FieldValue, Timestamp } from "firebase/firestore";

export type UserType = {
  email: string;
  password: string;
  username: string;
  id: string;
  avatar: string;
  group: string;
  incomes: number;
  expenses: number;
};

export type UserContextType = {
  user: User | null;
  userData: DocumentData | null;
  loading: boolean;
};

export type TransactionType = {
  username: string;
  userID: string;
  amount: number;
  description: string;
  category: string;
  color: string;
  transactionType: string;
  createdAt: Timestamp | FieldValue;
  id?: string;
  icon: string;
};
