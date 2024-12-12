import { Progress } from "@/components/ui/progress";
import { TransactionContext } from "@/context/TransactionContext";
import { useContext, useState } from "react";

const Savings = () => {
  const [goal, setGoal] = useState({ label: "Summer Break", goal: 38000 });
  const { balance } = useContext(TransactionContext);

  const progress = Math.min((balance / goal.goal) * 100, 100);
  return (
    <div className="mt-12">
      <div className="flex items-center justify-between gap-4">
        <p className="font-semibold text-customBlack">
          Goal fo saving: <span className="font-normal"> {goal.label}</span>
        </p>
        <p>
          {balance}/{goal.goal}
        </p>
      </div>
      <Progress
        value={progress}
        progress={progress}
        className="h-16 rounded-[5px] mt-2"
      />
    </div>
  );
};

export default Savings;
