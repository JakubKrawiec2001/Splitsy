import { User } from "firebase/auth";

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
  loading: boolean;
};
