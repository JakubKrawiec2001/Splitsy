import {
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useContext, useState } from "react";
import { TransactionContext } from "@/context/TransactionContext";
import { sumTransactionsByCategory } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useTruncate } from "@/hooks/useTruncate";

const Reports = () => {
  const [transactionType, setTransactionType] = useState("expenses");
  const {
    expenses,
    revenues,
    balance,
    isExpensesLoading,
    isRevenuesLoading,
    totalExpenses,
    totalRevenues,
  } = useContext(TransactionContext);
  const { truncateText } = useTruncate(1400, 4);

  const groupedExpenseCategories = sumTransactionsByCategory(expenses);
  const groupedRevenueCategories = sumTransactionsByCategory(revenues);

  const chartData =
    transactionType === "expenses"
      ? groupedExpenseCategories.map((expense) => ({
          category: expense.category.toLocaleLowerCase(),
          amount: expense.totalAmount,
          fill: expense.color,
        }))
      : groupedRevenueCategories.map((revenue) => ({
          category: revenue.category.toLocaleLowerCase(),
          amount: revenue.totalAmount,
          fill: revenue.color,
        }));

  const chartConfig = chartData.reduce(
    (
      config: {
        [key: string]: { label: string; amount: number; color: string };
      },
      item
    ) => {
      config[item.category.toLocaleLowerCase()] = {
        label: item.category,
        amount: item.amount,
        color: item.fill,
      };
      return config;
    },
    {}
  );
  return (
    <Card className="bg-white rounded-[5px] p-6">
      <div className="flex items-center justify-between">
        <CardHeader>
          <CardTitle>Your all expenses based on categories</CardTitle>
          <CardDescription>
            All {transactionType === "expenses" ? "expense" : "revenue"}{" "}
            categories -{" "}
            <span className="font-bold text-customBlack">
              {chartData.length}
            </span>
          </CardDescription>
        </CardHeader>
        <Select
          defaultValue="expenses"
          onValueChange={(value) => setTransactionType(value)}
        >
          <SelectTrigger className="w-[180px] bg-customBlack text-white font-semibold hover:bg-customBlackHover transition-colors">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="expenses">Expenses</SelectItem>
            <SelectItem value="revenues">Revenues</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <CardContent className="mt-8">
        {!isExpensesLoading || !isRevenuesLoading ? (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto lg:h-[320px] 2xl:h-[300px] w-full"
          >
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="category"
                tickLine={false}
                tickMargin={12}
                axisLine={false}
                className="font-medium capitalize"
                tickFormatter={(value) =>
                  truncateText(
                    chartConfig[value as keyof typeof chartConfig]?.label ?? ""
                  )
                }
              />
              <YAxis
                dataKey="amount"
                tickMargin={20}
                tickLine={false}
                axisLine={false}
                className="font-bold"
                tickFormatter={(value) => value.toLocaleString()}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Bar
                dataKey="amount"
                strokeWidth={4}
                radius={8}
                activeBar={({ ...props }) => {
                  return <Rectangle {...props} stroke={props.payload.fill} />;
                }}
              />
            </BarChart>
          </ChartContainer>
        ) : (
          <Loader2 size={60} className="animate-spin text-customCyan" />
        )}
      </CardContent>
    </Card>
  );
};

export default Reports;
