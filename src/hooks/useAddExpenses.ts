import { db } from "@/config/firebase";
import { TransactionType } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDoc, collection } from "firebase/firestore";

const addExpense = async (data: TransactionType) => {
  const {
    username,
    userID,
    amount,
    description,
    category,
    color,
    transactionType,
    createdAt,
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
      createdAt,
    });
  } catch (error) {
    console.log(error);
  }
};

export const useAddExpenses = () => {
  //   const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TransactionType) => addExpense(data),
  });
};
