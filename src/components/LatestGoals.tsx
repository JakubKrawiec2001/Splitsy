import { useFetchCurrentUserGoals } from "@/hooks/useFetchCurrentUserGoals";
import { useUser } from "@/hooks/useUser";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaInfoCircle } from "react-icons/fa";
import { Progress } from "./ui/progress";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

const LatestGoals = ({ balance }: { balance: number }) => {
  const { userData } = useUser();
  const { data: goals, isPending: isGoalsLoading } = useFetchCurrentUserGoals(
    userData?.id
  );

  const calculateProgress = (goalAmount: number) =>
    Math.min((balance / goalAmount) * 100, 100);
  return (
    <div className="bg-white p-6 md:w-[60%] relative 2lg:hidden xl:block">
      <div className="flex flex-col">
        <p className="text-customBlack font-semibold">Your latest goals</p>
        <p className="text-customTextColor text-sm">
          Manage your goals in the{" "}
          <Link
            to="/savings"
            className="underline hover:text-customBlackHover transition-colors"
          >
            savings tab
          </Link>
        </p>
      </div>
      {goals?.length === 0 && (
        <p className="text-customTextColor text-center absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
          You don't have planned achievement goals.{" "}
          <Link
            to="/savings"
            className="font-medium underline cursor-pointer hover:text-customBlackHover"
          >
            Add a new one
          </Link>
        </p>
      )}
      <div className="flex flex-col gap-8 mt-8 rounded-[5px]">
        {!isGoalsLoading ? (
          goals?.slice(0, 3).map((goal) => {
            const progress = calculateProgress(goal.goal);
            return (
              <div key={goal.id}>
                <div className="flex justify-between gap-4">
                  <span className="font-semibold text-customBlack text-sm">
                    {goal.label}
                  </span>
                  <div className="flex items-center self-end gap-1">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <FaInfoCircle className="text-gray-300 hover:text-gray-400 transition-colors hidden 2lg:block" />
                        </TooltipTrigger>
                        <TooltipContent className="bg-white shadow-md rounded-[5px] text-customTextColor w-[50%]">
                          <p>
                            Your savings goals are automatically calculated
                            based on your balance in the app. <br />
                            <span className="font-bold">
                              Your current balance is: ${balance}
                            </span>
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <p className="text-sm">
                      {balance} /{" "}
                      <span className="font-medium">{goal.goal}</span>
                      <span
                        className={`ml-2 ${
                          progress === 100
                            ? "text-green-500 font-semibold"
                            : "text-customTextColor"
                        }`}
                      >
                        ({progress.toFixed(0)}%)
                      </span>
                    </p>
                  </div>
                </div>
                <Progress
                  value={progress}
                  progress={progress}
                  className="h-10 rounded-[5px] mt-2"
                />
              </div>
            );
          })
        ) : (
          <Loader2 size={60} className="animate-spin text-customCyan" />
        )}
      </div>
    </div>
  );
};

export default LatestGoals;
