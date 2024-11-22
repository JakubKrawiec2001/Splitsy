import { User } from "firebase/auth";
import { DocumentData } from "firebase/firestore";

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
