import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { TransactionType } from "@/types";
import { Loader2 } from "lucide-react";

type PropsType = {
  expenses: TransactionType[];
  isExpensesLoading: boolean;
};

const ExpensesTable = ({ expenses, isExpensesLoading }: PropsType) => {
  if (isExpensesLoading)
    return <Loader2 size={60} className="animate-spin text-customCyan" />;
  return (
    <div className="max-h-[760px] overflow-y-auto custom-scroll">
      <Table>
        <TableBody>
          {expenses.map((expense) => {
            return (
              <TableRow>
                <TableCell className="flex items-center gap-4 2xl:gap-6">
                  <div
                    className="rounded-full xl:size-[40px] 2xl:size-[45px] hidden xl:block"
                    style={{ backgroundColor: expense.color }}
                  >
                    <img
                      src={expense.icon}
                      alt=""
                      className="w-full p-2 xl:p-3 invert-[1]"
                    />
                  </div>
                  <div>
                    <p className="truncate text-customBlack text-base">
                      {expense.category}
                    </p>
                    <p className="text-customTextColor">
                      {expense.description}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="text-right text-customBlack text-base font-semibold 2lg:pr-4 xl:pr-8">
                  ${expense.amount}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ExpensesTable;
