import { db } from "@/config/firebase";
import { TransactionType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

const fetchCurrentUserExpenses = async (currentUserId: string) => {
	try {
		const expensesQuery = query(
			collection(db, "expenses"),
			where("userID", "==", currentUserId),
			orderBy("createdAt", "desc")
		);
		const response = await getDocs(expensesQuery);
		const data = response.docs.map((item) => ({
			...item.data(),
			id: item.id,
		})) as TransactionType[];
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const useFetchCurrentUserExpenses = (currentUserId: string) => {
	return useQuery({
		queryKey: ["expenses", currentUserId],
		queryFn: ({ queryKey }) => fetchCurrentUserExpenses(queryKey[1]),
		enabled: !!currentUserId,
		staleTime: Infinity,
	});
};
