import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { goalSchema } from "@/utils/schemas";
import { useUser } from "@/hooks/useUser";
import { Button } from "./ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { CiCirclePlus } from "react-icons/ci";
import { useState } from "react";
import { useAddGoal } from "@/hooks/useAddGoal";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const AddNewGoal = () => {
	const [isOpenDialog, setIsOpenDialog] = useState(false);
	const { userData } = useUser();
	const addGoal = useAddGoal(userData?.id);
	const { toast } = useToast();

	const form = useForm<z.infer<typeof goalSchema>>({
		resolver: zodResolver(goalSchema),
		defaultValues: {
			label: "",
			goal: 0,
		},
	});

	const onSubmit = async (data: z.infer<typeof goalSchema>) => {
		const goalData = {
			goal: data.goal,
			label: data.label,
			userId: userData?.id,
		};
		addGoal.mutate(goalData, {
			onSuccess: () => {
				form.reset();
				setIsOpenDialog((prev) => !prev);
				toast({
					variant: "default",
					title: "Success",
					description: "Successfully added new goal",
				});
			},
			onError: (error) => {
				console.error("Transaction Error: ", error);
			},
		});
	};

	return (
		<>
			<Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
				<DialogTrigger>
					<div className="group flex items-center justify-center hover:border-customBlackHover border-dashed border-2 border-gray-300 h-24 transition-colors cursor-pointer rounded-[5px] w-full shadow-none">
						<CiCirclePlus className="text-5xl text-gray-300 group-hover:text-customBlackHover transition-colors" />
					</div>
				</DialogTrigger>
				<DialogContent className="bg-white">
					<DialogHeader>
						<DialogTitle className="flex items-center gap-4 text-lg mb-4">
							Add new goal
						</DialogTitle>
						<DialogDescription>
							<Form {...form}>
								<form
									onSubmit={form.handleSubmit(onSubmit)}
									className="flex flex-col gap-6 xs:gap-8 md:gap-12">
									<div className="flex flex-col gap-6">
										<FormField
											control={form.control}
											name="goal"
											render={({ field }) => (
												<div className="w-full">
													<FormLabel className="text-customBlack">
														Amount
													</FormLabel>
													<FormControl>
														<Input
															type="number"
															className="mt-1"
															placeholder="Specify amount"
															min={0}
															{...field}
															onChange={(e) =>
																field.onChange(e.target.valueAsNumber)
															}
														/>
													</FormControl>
													<FormMessage className="mt-2" />
												</div>
											)}
										/>
										<FormField
											control={form.control}
											name="label"
											render={({ field }) => (
												<div className="w-full">
													<FormLabel className="text-customBlack">
														Description
													</FormLabel>
													<FormControl>
														<Input
															maxLength={15}
															className="mt-1"
															placeholder="Describe transaction"
															{...field}
														/>
													</FormControl>
													<FormMessage className="mt-2" />
												</div>
											)}
										/>
									</div>

									<div className="flex flex-col items-center gap-4">
										<Button
											type="submit"
											className="cyan_bg_gradient text-white w-full text-lg xs:py-6 rounded-[5px]"
											disabled={addGoal.isPending}>
											{addGoal.isPending ? (
												<span className="flex items-center gap-2">
													<Loader2 size={20} className="animate-spin" />
													Loading...
												</span>
											) : (
												"Add"
											)}
										</Button>
									</div>
								</form>
							</Form>
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default AddNewGoal;
