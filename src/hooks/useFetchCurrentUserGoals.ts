import { db } from "@/config/firebase";
import { GoalType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, where } from "firebase/firestore";

const fetchCurrentUserGoals = async (currentUserId: string) => {
	try {
		const goalsQuery = query(
			collection(db, "goals"),
			where("userId", "==", currentUserId)
		);
		const response = await getDocs(goalsQuery);
		const data = response.docs.map((item) => ({
			...item.data(),
			id: item.id,
		})) as GoalType[];
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const useFetchCurrentUserGoals = (currentUserId: string) => {
	return useQuery({
		queryKey: ["goals", currentUserId],
		queryFn: ({ queryKey }) => fetchCurrentUserGoals(queryKey[1]),
		enabled: !!currentUserId,
		staleTime: Infinity,
	});
};
