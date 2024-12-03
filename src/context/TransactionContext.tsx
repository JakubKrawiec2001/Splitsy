import { useFetchCurrentUserExpenses } from "@/hooks/useFetchCurrentUserExpenses";
import { useFetchCurrentUserRevenues } from "@/hooks/useFetchCurrentUserRevenues";
import { useUser } from "@/hooks/useUser";
import { TransactionContextType } from "@/types";
import { createContext, ReactNode } from "react";

const initialValue = {
  expenses: [],
  revenues: [],
  isExpensesLoading: false,
  isRevenuesLoading: false,
  totalExpenses: 0,
  totalRevenues: 0,
};

export const TransactionContext =
  createContext<TransactionContextType>(initialValue);

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const { userData } = useUser();
  const { data: expenses = [], isPending: isExpensesLoading } =
    useFetchCurrentUserExpenses(userData?.id);
  const { data: revenues = [], isPending: isRevenuesLoading } =
    useFetchCurrentUserRevenues(userData?.id);

  const totalExpenses = expenses?.reduce(
    (acc, expense) => acc + (expense.amount || 0),
    0
  );

  const totalRevenues = revenues?.reduce(
    (acc, revenue) => acc + (revenue.amount || 0),
    0
  );
  return (
    <TransactionContext.Provider
      value={{
        expenses,
        revenues,
        isExpensesLoading,
        isRevenuesLoading,
        totalExpenses,
        totalRevenues,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
