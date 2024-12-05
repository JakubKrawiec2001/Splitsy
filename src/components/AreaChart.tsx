import { Area, AreaChart as Chart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TransactionType } from "@/types";

type PropsType = {
  revenues: TransactionType[];
  expenses: TransactionType[];
};

const AreaChart = ({ revenues, expenses }: PropsType) => {
  const createChartData = (
    expenses: TransactionType[],
    revenues: TransactionType[]
  ) => {
    const categories = [
      ...new Set([
        ...expenses.map((e) => e.category),
        ...revenues.map((r) => r.category),
      ]),
    ];

    const chartData = categories.map((category) => {
      const expense = expenses.find((e) => e.category === category);
      const revenue = revenues.find((r) => r.category === category);

      return {
        category,
        expenses: expense ? expense.amount : 0,
        revenues: revenue ? revenue.amount : 0,
      };
    });

    return chartData;
  };

  const chartData = createChartData(expenses, revenues);

  const chartConfig = {
    expenses: {
      label: "Expenses",
      color: "#0FE6DC",
    },
    revenues: {
      label: "Revenues",
      color: "#26272F",
    },
  } satisfies ChartConfig;
  return (
    <div className="bg-white col-start-1 col-end-5 row-start-4 row-end-5 py-4">
      <Card>
        <CardHeader className="flex items-center gap-2 space-y-0 py-5 sm:flex-row">
          <div className="grid flex-1 gap-1 text-center sm:text-left">
            <CardTitle className="text-customBlack">
              Transaction Details
            </CardTitle>
            <CardDescription className="text-customTextColor">
              Detailed comparison of expenses and revenues for recent categories
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6 pb-0">
          <ChartContainer
            config={chartConfig}
            className="aspect-auto lg:h-[320px] 2xl:h-[300px] w-full"
          >
            <Chart data={chartData}>
              <defs>
                <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-revenues)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-revenues)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient id="fillExpense" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-expenses)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-expenses)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="category"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => value}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => value}
                    indicator="dot"
                  />
                }
              />
              <Area
                dataKey="expenses"
                type="natural"
                fill="url(#fillExpense)"
                stroke="var(--color-expenses)"
                stackId="a"
              />
              <Area
                dataKey="revenues"
                type="natural"
                fill="url(#fillRevenue)"
                stroke="var(--color-revenues)"
                stackId="a"
              />
              <ChartLegend content={<ChartLegendContent className="mt-6" />} />
            </Chart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default AreaChart;
