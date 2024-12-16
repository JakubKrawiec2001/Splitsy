import { Label, Pie, PieChart as Chart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TransactionType } from "@/types";
import { sumTransactionsByCategory } from "@/lib/utils";

type PropsType = {
  expenses: TransactionType[];
  totalExpenses: number;
};

const PieChart = ({ expenses, totalExpenses }: PropsType) => {
  const groupedExpenseCategories = sumTransactionsByCategory(expenses);
  const chartData = groupedExpenseCategories.map((expense) => ({
    category: expense.category.toLocaleLowerCase(),
    amount: expense.totalAmount,
    fill: expense.color,
  }));

  const chartConfig = chartData.reduce(
    (config: { [key: string]: { label: string; color: string } }, item) => {
      config[item.category.toLocaleLowerCase()] = {
        label: item.category,
        color: item.fill,
      };
      return config;
    },
    {}
  );

  const biggestExpenses = groupedExpenseCategories.sort(
    (a, b) => b.totalAmount - a.totalAmount
  );

  return (
    <div className=" bg-white md:py-4 flex items-center justify-center md:w-[40%] 2lg:w-full xl:w-[40%]">
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Expense categories</CardTitle>
          <CardDescription className="text-customTextColor font-medium text-center">
            November - December 2024
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <Chart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="amount"
                nameKey="category"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-semibold fill-customBlack"
                          >
                            ${totalExpenses}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground fill-customTextColor"
                          >
                            Expenses
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </Chart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-4 text-sm">
          <p className="text-customBlack font-semibold">
            Latest biggest expenses
          </p>{" "}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 xl:gap-2 2xl:gap-4 w-full">
            {biggestExpenses.slice(0, 3).map((expense) => {
              return (
                <div key={expense.id} className="flex items-center gap-2">
                  <div
                    style={{ backgroundColor: expense.color }}
                    className="rounded-full bg-customBlack"
                  >
                    <img
                      src={expense.icon}
                      alt={expense.category}
                      className="w-[25px] p-[0.4em]"
                    />
                  </div>
                  <p className="text-customTextColor font-medium">
                    {expense.category}
                  </p>
                </div>
              );
            })}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PieChart;
