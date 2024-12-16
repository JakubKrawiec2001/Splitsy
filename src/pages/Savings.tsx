import AddNewGoal from "@/components/AddNewGoal";
import { Progress } from "@/components/ui/progress";
import { TransactionContext } from "@/context/TransactionContext";
import { useFetchCurrentUserGoals } from "@/hooks/useFetchCurrentUserGoals";
import { useUser } from "@/hooks/useUser";
import { Loader2 } from "lucide-react";
import { useContext, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaInfoCircle } from "react-icons/fa";
import { useDeleteGoal } from "@/hooks/useDeleteGoal";
import { useToast } from "@/hooks/use-toast";
import { FaTrashAlt } from "react-icons/fa";

const Savings = () => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const { userData } = useUser();
  const { data: goals, isPending: isGoalsLoading } = useFetchCurrentUserGoals(
    userData?.id
  );
  const { balance } = useContext(TransactionContext);
  const deleteGoal = useDeleteGoal(userData?.id);
  const { toast } = useToast();

  const calculateProgress = (goalAmount: number) =>
    Math.min((balance / goalAmount) * 100, 100);

  const handleDeleteGoal = (goalId: string) => {
    deleteGoal.mutate(
      { goalId },
      {
        onSuccess: () => {
          toast({
            variant: "default",
            title: "Success",
            description: "Successfully deleted goal",
          });
        },
      }
    );
  };

  return (
    <>
      <div className="bg-white rounded-[5px] p-4 2lg:p-10 flex flex-col">
        <p className="font-medium 2lg:text-lg mb-4 text-customBlack">
          Plan your savings goals
        </p>
        <AddNewGoal
          isOpenDialog={isOpenDialog}
          setIsOpenDialog={setIsOpenDialog}
        />
      </div>
      {goals?.length === 0 && (
        <p className="text-customTextColor text-center">
          You don't have planned achievement goals.{" "}
          <span
            className="font-medium underline cursor-pointer hover:text-customBlackHover"
            onClick={() => setIsOpenDialog(true)}
          >
            Add a new one
          </span>
        </p>
      )}
      <div className="flex flex-col gap-4">
        {!isGoalsLoading ? (
          goals?.map((goal) => {
            const progress = calculateProgress(goal.goal);
            return (
              <div
                key={goal.id}
                className="bg-white rounded-[5px] p-4 2lg:p-10 relative"
              >
                {deleteGoal.isPending ? (
                  <Loader2 size={30} className="animate-spin text-[#FF2F55]" />
                ) : (
                  <FaTrashAlt
                    className="absolute top-4 right-4 md:text-lg text-[#FF2F55] hover:text-[#ff2f55c2] transition-colors cursor-pointer"
                    onClick={() => handleDeleteGoal(goal.id!)}
                  />
                )}
                <div className="flex justify-between gap-4">
                  <div className="flex flex-col">
                    <p className="text-customTextColor text-sm md:text-base">
                      Goal of saving
                    </p>
                    <span className="font-semibold text-customBlack text-base md:text-lg">
                      {goal.label}
                    </span>
                  </div>
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
                    <p className="text-xs md:text-base">
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
                  className="h-12 md:h-16 rounded-[5px] mt-2"
                />
              </div>
            );
          })
        ) : (
          <Loader2 size={60} className="animate-spin text-customCyan" />
        )}
      </div>
    </>
  );
};

export default Savings;
