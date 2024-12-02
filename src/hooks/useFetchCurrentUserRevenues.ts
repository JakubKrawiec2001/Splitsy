import { db } from "@/config/firebase";
import { TransactionType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

const fetchCurrentUserRevenues = async (currentUserId: string) => {
  try {
    const expensesQuery = query(
      collection(db, "revenues"),
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

export const useFetchCurrentUserRevenues = (currentUserId: string) => {
  return useQuery({
    queryKey: ["revenues", currentUserId],
    queryFn: ({ queryKey }) => fetchCurrentUserRevenues(queryKey[1]),
    enabled: !!currentUserId,
    staleTime: Infinity,
  });
};
