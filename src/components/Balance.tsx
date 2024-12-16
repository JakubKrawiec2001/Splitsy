import { Loader2 } from "lucide-react";
import { FaWallet } from "react-icons/fa";
import { GiCoinsPile } from "react-icons/gi";

type PropsType = {
  balance: number;
  isRevenuesLoading: boolean;
  isExpensesLoading: boolean;
};

const Balance = ({
  balance,
  isExpensesLoading,
  isRevenuesLoading,
}: PropsType) => {
  return (
    <div className="bg-customBlack shadow-sm rounded-[5px] flex items-center justify-between gap-4 p-4 md:p-6 2xl:px-8 2xl:py-2 col-start-1 md:col-start-5 col-end-7 row-start-1 row-end-2 relative overflow-hidden">
      <div className="flex flex-col justify-center gap-1">
        <FaWallet className="bg-white rounded-[5px] p-2 text-4xl text-customBlack" />
        <p className="text-customLightGray font-medium text-base xl:text-sm mt-2">
          My Balance
        </p>
        {isExpensesLoading || isRevenuesLoading ? (
          <Loader2 size={60} className="animate-spin text-customCyan" />
        ) : (
          <p className="text-3xl md:text-4xl xl:text-2xl 2xl:text-3xl text-white font-medium">
            ${balance.toFixed(2)}
          </p>
        )}
      </div>
      <GiCoinsPile className="absolute top-[5%] right-[-5%] text-white text-[15rem] opacity-10 -rotate-[20deg]" />
      <div className="absolute right-[5%] top-1/2 bg-customCyan rounded-full size-[50px] blur-[50px]"></div>
      <div className="absolute left-[5%] top-[5%] bg-customCyan rounded-full size-[50px] blur-[50px]"></div>
    </div>
  );
};

export default Balance;
