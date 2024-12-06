import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ExpensesTable from "./ExpensesTable";
import { useContext } from "react";
import { TransactionContext } from "@/context/TransactionContext";
import RevenuesTable from "./RevenuesTable";

const TransactionTabs = () => {
  const { expenses, revenues, isExpensesLoading, isRevenuesLoading } =
    useContext(TransactionContext);
  return (
    <div className="bg-white shadow-sm rounded-[5px] col-start-5 col-end-7 row-start-2 row-end-5 p-6 pr-2">
      <Tabs defaultValue="expenses">
        <TabsList className="flex justify-between pr-6">
          <p className="text-customBlack font-semibold">
            List of recent transactions
          </p>
          <div className="flex gap-4">
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="revenues">Revenues</TabsTrigger>
          </div>
        </TabsList>
        <TabsContent value="expenses" className="mt-4">
          <ExpensesTable
            expenses={expenses}
            isExpensesLoading={isExpensesLoading}
          />
        </TabsContent>
        <TabsContent value="revenues" className="mt-4">
          {" "}
          <RevenuesTable
            revenues={revenues}
            isRevenuesLoading={isRevenuesLoading}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TransactionTabs;
