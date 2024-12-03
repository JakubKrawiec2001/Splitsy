import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaPlus } from "react-icons/fa6";
import { categories, iconList } from "@/constansts";
import { useAddExpenses } from "@/hooks/useAddExpenses";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useAddRevenues } from "@/hooks/useAddRevenues";
import { serverTimestamp } from "firebase/firestore";

const AddTransactions = () => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const { userData } = useUser();
  const { toast } = useToast();
  const addExpense = useAddExpenses(userData?.id);
  const addRevenue = useAddRevenues(userData?.id);

  const form = useForm<z.infer<typeof expenseSchema>>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      color: "#000000",
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
      category: data.category,
      color: data.color,
      createdAt: serverTimestamp(),
      icon: data.icon,
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

  const colorValue = useWatch({
    control: form.control,
    name: "color",
  });
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
                                : "text-customTextColor bg-customDarkGray hover:bg-customGray hover:text-customBlack transition-colors cursor-pointer"
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
                                : "text-customTextColor bg-customDarkGray hover:bg-customGray hover:text-customBlack transition-colors cursor-pointer"
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
                          <FormMessage />
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
                              className="mt-1"
                              placeholder="Describe transaction"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </div>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <div className="w-full">
                          <FormLabel className="text-customBlack">
                            Categories
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            {...field}
                          >
                            <FormControl className="mt-1">
                              <SelectTrigger>
                                <SelectValue placeholder="Select categorie" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem
                                  key={category}
                                  value={category}
                                  className="mb-1"
                                >
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </div>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="color"
                      render={({ field }) => (
                        <div className="w-full flex flex-col">
                          <FormLabel>Select color</FormLabel>
                          <FormControl className="mt-2">
                            <input
                              type="color"
                              value={field.value}
                              onChange={field.onChange}
                              className="h-12 w-full bg-customBlack p-1 rounded-[5px] cursor-pointer"
                            />
                          </FormControl>
                          <FormMessage />
                        </div>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="icon"
                      render={({ field }) => (
                        <div className="w-full">
                          <FormLabel>Choose icon</FormLabel>
                          <div className="flex flex-wrap gap-2 mt-4">
                            {iconList.map((icon) => {
                              return (
                                <div
                                  key={icon.id}
                                  className={`p-3 opacity-100 ${
                                    field.value === icon.icon
                                      ? "rounded-xl"
                                      : "rounded-full hover:opacity-60 transition-opacity cursor-pointer"
                                  }`}
                                  style={{ backgroundColor: colorValue }}
                                  onClick={() => {
                                    field.onChange(icon.icon);
                                  }}
                                >
                                  <img
                                    src={icon.icon}
                                    alt=""
                                    className="w-[30px] invert-[1]"
                                  />
                                </div>
                              );
                            })}
                          </div>
                          <FormMessage />
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
