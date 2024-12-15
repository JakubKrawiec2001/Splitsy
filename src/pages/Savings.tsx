import AddNewGoal from "@/components/AddNewGoal";
import { Progress } from "@/components/ui/progress";
import { TransactionContext } from "@/context/TransactionContext";
import { useFetchCurrentUserGoals } from "@/hooks/useFetchCurrentUserGoals";
import { useUser } from "@/hooks/useUser";
import { Loader2 } from "lucide-react";
import { useContext } from "react";
import { CiCirclePlus } from "react-icons/ci";

const Savings = () => {
	const { userData } = useUser();
	const { data: goals, isPending: isGoalsLoading } = useFetchCurrentUserGoals(
		userData?.id
	);
	const { balance } = useContext(TransactionContext);

	const calculateProgress = (goalAmount: number) =>
		Math.min((balance / goalAmount) * 100, 100);

	return (
		<div className="bg-white rounded-[5px] p-10 flex flex-col gap-10">
			{!isGoalsLoading ? (
				goals?.map((goal) => {
					const progress = calculateProgress(goal.goal);
					return (
						<div key={goal.id}>
							<div className="flex items-center justify-between gap-4">
								<p className="font-semibold text-customBlack">
									Goal of saving:{" "}
									<span className="font-normal"> {goal.label}</span>
								</p>
								<p>
									{balance}/{goal.goal}{" "}
									<span className="text-customTextColor">
										({progress.toFixed(0)}%)
									</span>
								</p>
							</div>
							<Progress
								value={progress}
								progress={progress}
								className="h-16 rounded-[5px] mt-2"
							/>
						</div>
					);
				})
			) : (
				<Loader2 size={60} className="animate-spin text-customCyan" />
			)}
			<AddNewGoal />
		</div>
	);
};

export default Savings;
