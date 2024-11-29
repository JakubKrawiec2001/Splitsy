import { db } from "@/config/firebase";
import { TransactionType } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDoc, collection } from "firebase/firestore";

const addTransaction = async (data: TransactionType) => {
  const {
    username,
    userID,
    amount,
    description,
    category,
    color,
    transactionType,
  } = data;
  try {
    await addDoc(collection(db, "expenses"), {
      transactionType,
      username,
      userID,
      amount,
      description,
      category,
      color,
    });
  } catch (error) {
    console.log(error);
  }
};

export const useAddTransaction = () => {
  //   const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TransactionType) => addTransaction(data),
  });
};
