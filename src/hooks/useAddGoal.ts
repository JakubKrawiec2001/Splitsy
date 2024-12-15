import { db } from "@/config/firebase";
import { GoalType } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDoc, collection } from "firebase/firestore";

const addGoal = async (data: GoalType) => {
	const { goal, label, userId } = data;
	try {
		await addDoc(collection(db, "goals"), {
			goal,
			label,
			userId,
		});
	} catch (error) {
		console.log(error);
	}
};

export const useAddGoal = (currentUserId: string) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: GoalType) => addGoal(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["goals", currentUserId] });
		},
	});
};
