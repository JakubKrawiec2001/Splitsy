import AreaChart from "@/components/AreaChart";
import Balance from "@/components/Balance";
import PieChart from "@/components/PieChart";
import TotalExpenses from "@/components/TotalExpenses";
import TotalRevenues from "@/components/TotalRevenues";
import TransactionTabs from "@/components/TransactionTabs";
import { TransactionContext } from "@/context/TransactionContext";
import { useUser } from "@/hooks/useUser";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const {
    expenses,
    revenues,
    balance,
    isExpensesLoading,
    isRevenuesLoading,
    totalExpenses,
    totalRevenues,
  } = useContext(TransactionContext);

  useEffect(() => {
    if (!user) {
      navigate("/sign-in");
    }
  }, [user, navigate]);

  return (
    <div className="dashboard_grid">
      <TotalExpenses
        totalExpenses={totalExpenses}
        expenses={expenses}
        isExpensesLoading={isExpensesLoading}
      />
      <TotalRevenues
        totalRevenues={totalRevenues}
        revenues={revenues}
        isRevenuesLoading={isRevenuesLoading}
      />
      <Balance
        balance={balance}
        isExpensesLoading={isExpensesLoading}
        isRevenuesLoading={isRevenuesLoading}
      />
      <PieChart expenses={expenses} totalExpenses={totalExpenses} />
      <TransactionTabs />
      <AreaChart expenses={expenses} revenues={revenues} />
    </div>
  );
};

export default Home;
