import { db } from "@/config/firebase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDoc, doc } from "firebase/firestore";

const deleteTransaction = async ({
  type,
  transactionId,
}: {
  type: string;
  transactionId: string;
}) => {
  try {
    const docRef = doc(db, type, transactionId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting transaction:", error);
  }
};

export const useDeletTransaction = (currentUserId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      type,
      transactionId,
    }: {
      type: string;
      transactionId: string;
    }) => deleteTransaction({ type, transactionId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses", currentUserId] });
    },
  });
};
