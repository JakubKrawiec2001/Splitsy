import { db } from "@/config/firebase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDoc, doc } from "firebase/firestore";

const deleteGoal = async ({ goalId }: { goalId: string }) => {
  try {
    const docRef = doc(db, "goals", goalId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting transaction:", error);
  }
};

export const useDeleteGoal = (currentUserId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ goalId }: { goalId: string }) => deleteGoal({ goalId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["goals", currentUserId],
      });
    },
  });
};
