import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ExpensesTable from "./ExpensesTable";
import { useContext } from "react";
import { TransactionContext } from "@/context/TransactionContext";

const TransactionTabs = () => {
  const { expenses, revenues, isExpensesLoading, isRevenuesLoading } =
    useContext(TransactionContext);
  return (
    <div className="bg-white shadow-sm rounded-[5px] col-start-5 col-end-7 row-start-2 row-end-5 p-6">
      <Tabs defaultValue="expenses">
        <TabsList>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="revenues">Revenues</TabsTrigger>
        </TabsList>
        <TabsContent value="expenses">
          <ExpensesTable
            expenses={expenses}
            isExpensesLoading={isExpensesLoading}
          />
        </TabsContent>
        <TabsContent value="revenues">Rvenues table</TabsContent>
      </Tabs>
    </div>
  );
};

export default TransactionTabs;
