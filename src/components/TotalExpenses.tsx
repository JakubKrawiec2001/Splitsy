import { TbArrowDownFromArc } from "react-icons/tb";
import { Loader2 } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TransactionType } from "@/types";

type PropsType = {
  expenses: TransactionType[];
  totalExpenses: number;
  isExpensesLoading: boolean;
};

const TotalExpenses = ({
  expenses,
  totalExpenses,
  isExpensesLoading,
}: PropsType) => {
  const chartData = expenses.slice(0, 3).map((expense) => ({
    category: expense.category.toLocaleLowerCase(),
    amount: expense.amount,
  }));

  const chartConfig = {
    amount: {
      label: "Amount",
      color: "#0FE6DC",
    },
  };

  return (
    <div className="bg-white shadow-sm rounded-[5px] hidden md:flex items-center justify-between gap-4 p-6 2xl:px-8 2xl:py-2 col-start-1 col-end-3 row-start-1 row-end-2">
      <div className="flex flex-col justify-center gap-1">
        <TbArrowDownFromArc className="bg-gradient-to-r from-customBlackHover to-customBlack rounded-[5px] p-2 text-4xl text-customCyan" />
        <p className="text-customTextColor font-medium text-base xl:text-sm mt-2">
          Total Expenses
        </p>
        {isExpensesLoading ? (
          <Loader2 size={60} className="animate-spin text-customCyan" />
        ) : (
          <p className="text-4xl xl:text-2xl 2xl:text-3xl text-customBlack font-medium">
            ${totalExpenses.toFixed(2)}
          </p>
        )}
      </div>
      <ChartContainer
        config={chartConfig}
        className="xl:w-[50%] 2xl:w-[60%] h-full hidden xl:block"
      >
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} horizontal={false} />
          <XAxis
            dataKey="category"
            tickLine={false}
            tickMargin={2}
            axisLine={false}
            className="font-medium"
            tickFormatter={(value) => value.slice(0, 4) + "..."}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Bar dataKey="amount" fill="#0FE6DC" radius={8} />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default TotalExpenses;
