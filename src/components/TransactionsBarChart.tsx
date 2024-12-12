import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  XAxis,
  YAxis,
} from "recharts";
import { useTruncate } from "@/hooks/useTruncate";
import { ChartConfigType, ChartDataType } from "@/types";

type PropsType = {
  chartConfig: ChartConfigType;
  chartData: ChartDataType[];
};

const TransactionsBarChart = ({ chartData, chartConfig }: PropsType) => {
  const { truncateText } = useTruncate(1400, 4);

  return (
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
  );
};

export default TransactionsBarChart;
