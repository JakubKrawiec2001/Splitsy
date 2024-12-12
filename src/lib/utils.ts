import { TransactionType } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sumTransactionsByCategory = (transactions: TransactionType[]) => {
  const categoryTotals: Record<
    string,
    { totalAmount: number; icon: string; id: string; color: string }
  > = {};

  transactions.forEach((item) => {
    if (!item.id) {
      throw new Error(`Transaction is missing an id: ${JSON.stringify(item)}`);
    }
    const { category, amount, icon, id, color } = item;

    if (!categoryTotals[category]) {
      categoryTotals[category] = { totalAmount: 0, icon, id, color };
    }

    categoryTotals[category].totalAmount += amount;
  });

  return Object.entries(categoryTotals).map(([category, data]) => ({
    category,
    totalAmount: data.totalAmount,
    icon: data.icon,
    id: data.id,
    color: data.color,
  }));
};
