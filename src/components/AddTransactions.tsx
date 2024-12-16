import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { expenseSchema } from "@/utils/schemas";
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
import { FaPlus } from "react-icons/fa6";
import { categories } from "@/constansts";
import { useAddExpenses } from "@/hooks/useAddExpenses";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useAddRevenues } from "@/hooks/useAddRevenues";
import { serverTimestamp } from "firebase/firestore";
import { useTruncate } from "@/hooks/useTruncate";

const AddTransactions = () => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const { userData } = useUser();
  const { toast } = useToast();
  const addExpense = useAddExpenses(userData?.id);
  const addRevenue = useAddRevenues(userData?.id);
  const { truncateText } = useTruncate(600, 6);

  const form = useForm<z.infer<typeof expenseSchema>>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      transactionType: "expense",
    },
  });

  const onSubmit = async (data: z.infer<typeof expenseSchema>) => {
    const transactionData = {
      transactionType: data.transactionType,
      username: userData?.username,
      userID: userData?.id,
      amount: data.amount,
      description: data.description,
      category: data.category.label,
      color: data.category.color,
      createdAt: serverTimestamp(),
      icon: data.category.icon,
    };
    if (data.transactionType === "expense") {
      addExpense.mutate(transactionData, {
        onSuccess: () => {
          form.reset();
          setIsOpenDialog((prev) => !prev);
          toast({
            variant: "default",
            title: "Success",
            description: "Successfully added transaction",
          });
        },
        onError: (error) => {
          console.error("Transaction Error: ", error);
        },
      });
    }

    if (data.transactionType === "revenue") {
      addRevenue.mutate(transactionData, {
        onSuccess: () => {
          form.reset();
          setIsOpenDialog((prev) => !prev);
          toast({
            variant: "default",
            title: "Success",
            description: "Successfully added transaction",
          });
        },
        onError: (error) => {
          console.error("Transaction Error: ", error);
        },
      });
    }
  };

  return (
    <>
      <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
        <DialogTrigger>
          <Button className="bg-customBlack hover:bg-customBlackHover transition-colors text-white rounded-[5px]">
            Add New <FaPlus />
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-4 text-lg mb-4">
              Add new transaction
            </DialogTitle>
            <DialogDescription>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col gap-6 xs:gap-8 md:gap-12"
                >
                  <div className="flex flex-col gap-6">
                    <FormField
                      control={form.control}
                      name="transactionType"
                      render={({ field }) => (
                        <div className="flex items-center gap-2">
                          <Button
                            type="button"
                            value={field.value}
                            className={`${
                              field.value === "expense"
                                ? "text-customBlack cursor-default bg-customCyan"
                                : "text-customTextColor bg-customLightGray hover:bg-customGray hover:text-customBlack transition-colors cursor-pointer"
                            } shadow-none rounded-[300px] px-6 py-5`}
                            onClick={() => field.onChange("expense")}
                          >
                            Expense
                          </Button>
                          <Button
                            type="button"
                            value={field.value}
                            className={`${
                              field.value === "revenue"
                                ? "text-customBlack cursor-default bg-customCyan"
                                : "text-customTextColor bg-customLightGray hover:bg-customGray hover:text-customBlack transition-colors cursor-pointer"
                            } shadow-none rounded-[300px] px-6 py-5`}
                            onClick={() => field.onChange("revenue")}
                          >
                            Revenue
                          </Button>
                        </div>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="amount"
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
                      name="description"
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
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <div className="w-full">
                          <FormLabel>Choose category</FormLabel>
                          <div className="grid grid-cols-5 grid-rows-3 gap-6  mt-4">
                            {categories.map((category) => {
                              return (
                                <div
                                  className="flex flex-col items-center gap-1 group"
                                  onClick={() => {
                                    field.onChange(category);
                                  }}
                                >
                                  <div
                                    key={category.id}
                                    className={`p-3 opacity-100  ${
                                      field.value?.id === category.id
                                        ? "rounded-xl"
                                        : "rounded-full hover:opacity-60 transition-opacity cursor-pointer"
                                    }`}
                                    style={{ backgroundColor: category.color }}
                                  >
                                    <img
                                      src={category.icon}
                                      alt=""
                                      className="w-[30px] invert-[1]"
                                    />
                                  </div>
                                  <p
                                    className={`text-sm group-hover:text-black ${
                                      field.value?.id === category.id
                                        ? "text-black"
                                        : "text-customBlack"
                                    }`}
                                  >
                                    {truncateText(category.label)}
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                          <FormMessage className="mt-4" />
                        </div>
                      )}
                    />
                  </div>

                  <div className="flex flex-col items-center gap-4">
                    <Button
                      type="submit"
                      className="cyan_bg_gradient text-white w-full text-lg xs:py-6 rounded-[5px]"
                      disabled={addExpense.isPending || addRevenue.isPending}
                    >
                      {addExpense.isPending || addRevenue.isPending ? (
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

export default AddTransactions;
