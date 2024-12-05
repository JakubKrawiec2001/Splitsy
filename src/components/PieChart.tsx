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

type PropsType = {
  expenses: TransactionType[];
  totalExpenses: number;
};

const PieChart = ({ expenses, totalExpenses }: PropsType) => {
  const chartData = expenses.map((expense) => ({
    category: expense.category.toLocaleLowerCase(),
    amount: expense.amount,
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

  const biggestExpenses = expenses.sort((a, b) => b.amount - a.amount);

  return (
    <div className="col-start-1 col-end-3 row-start-2 row-end-4 bg-white">
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Expense categories</CardTitle>
          <CardDescription className="text-customTextColor font-medium">
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
          <div className="flex flex-wrap items-center justify-center gap-6 w-full">
            {biggestExpenses.slice(0, 4).map((expense) => {
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