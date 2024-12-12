import { ChartConfigType, ChartDataType } from "@/types";
import {
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CartesianGrid, Dot, Line, LineChart, YAxis } from "recharts";

type PropsType = {
  chartConfig: ChartConfigType;
  chartData: ChartDataType[];
};

const TransactionsLineChart = ({ chartData, chartConfig }: PropsType) => {
  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto lg:h-[320px] 2xl:h-[300px] w-full"
    >
      <LineChart accessibilityLayer data={chartData} margin={{ top: 35 }}>
        <CartesianGrid vertical={false} />
        <YAxis
          dataKey="amount"
          tickMargin={20}
          tickLine={false}
          axisLine={false}
          className="font-bold"
          tickFormatter={(value) => value.toLocaleString()}
        />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent indicator="line" nameKey="amount" hideLabel />
          }
        />
        <Line
          dataKey="amount"
          type="natural"
          stroke="#26272F"
          strokeWidth={2}
          dot={({ payload, ...props }) => {
            return (
              <Dot
                key={payload.browser}
                r={5}
                cx={props.cx}
                cy={props.cy}
                fill={payload.fill}
                stroke={payload.fill}
              />
            );
          }}
        />
        <ChartLegend
          content={() => {
            return (
              <div className="flex flex-wrap gap-8 justify-center mt-12">
                {chartData.map((item, index) => (
                  <div
                    key={`legend-item-${index}`}
                    className="flex items-center gap-1"
                  >
                    <span
                      className="inline-block size-[12px] rounded-full"
                      style={{
                        backgroundColor: item.fill,
                      }}
                    />
                    <p className="text-customTextColor capitalize font-medium">
                      {item.category}
                    </p>
                  </div>
                ))}
              </div>
            );
          }}
        />
      </LineChart>
    </ChartContainer>
  );
};

export default TransactionsLineChart;
