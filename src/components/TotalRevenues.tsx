import { TbArrowDownToArc } from "react-icons/tb";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { TransactionType } from "@/types";
import { Loader2 } from "lucide-react";

type PropsType = {
  revenues: TransactionType[];
  totalRevenues: number;
  isRevenuesLoading: boolean;
};

const TotalRevenues = ({
  revenues,
  totalRevenues,
  isRevenuesLoading,
}: PropsType) => {
  const chartData = revenues.slice(0, 3).map((revenue) => ({
    category: revenue.category.toLocaleLowerCase(),
    amount: revenue.amount,
  }));

  const chartConfig = {
    amount: {
      label: "Amount",
      color: "#0FE6DC",
    },
  };
  return (
    <div className="bg-white shadow-sm rounded-[5px] flex items-center justify-between gap-4 p-6 2xl:px-8 2xl:py-2 col-start-3 col-end-5 row-start-1 row-end-2">
      <div className="flex flex-col justify-center gap-1">
        <TbArrowDownToArc className="bg-gradient-to-r from-customBlackHover to-customBlack rounded-[5px] p-2 text-4xl text-customCyan" />
        <p className="text-customTextColor font-medium text-base xl:text-sm mt-2">
          Total Revenues
        </p>
        {isRevenuesLoading ? (
          <Loader2 size={60} className="animate-spin text-customCyan" />
        ) : (
          <p className="text-4xl xl:text-2xl 2xl:text-3xl text-customBlack font-medium">
            ${totalRevenues.toFixed(2)}
          </p>
        )}
      </div>
      <ChartContainer
        config={chartConfig}
        className="xl:w-[50%] 2xl:w-[60%] h-[80%] hidden xl:block bg-customGray rounded-[5px]"
      >
        <LineChart
          accessibilityLayer
          data={chartData}
          margin={{
            bottom: 30,
          }}
        >
          <CartesianGrid vertical={false} horizontal={false} />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Line
            dataKey="amount"
            type="natural"
            stroke="#0FE6DC"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
};

export default TotalRevenues;
