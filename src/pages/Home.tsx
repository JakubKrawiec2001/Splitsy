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
      <div className="bg-white col-start-1 col-end-5 row-start-4 row-end-5 "></div>

      {/* <div className="flex gap-2">
          {isExpensesLoading ? (
            <Loader2 size={60} className="animate-spin text-customCyan" />
          ) : (
            expenses?.map((expense) => {
              return (
                <div
                  key={expense.id}
                  className="bg-customBlack text-white p-1"
                  style={{ backgroundColor: expense.color }}
                >
                  <p>{expense.category}</p>
                  <img
                    src={expense.icon}
                    alt=""
                    className="w-[50px] invert-[1]"
                  />
                  <p>{expense.description}</p>
                  <p>{expense.username}</p>
                  <p>{expense.amount}</p>
                  {expense.createdAt instanceof Timestamp
                    ? new Date(
                        expense.createdAt.seconds * 1000
                      ).toLocaleDateString()
                    : "Invalid date"}
                </div>
              );
            })
          )}
          {expenses?.length === 0 && <p>You don't have any expenses</p>}
        </div>
        <div className="flex gap-2">
          {isRevenuesLoading ? (
            <Loader2 size={60} className="animate-spin text-customCyan" />
          ) : (
            revenues?.map((revenue) => {
              return (
                <div
                  key={revenue.id}
                  className="bg-customBlack text-white p-1"
                  style={{ backgroundColor: revenue.color }}
                >
                  <p>{revenue.category}</p>
                  <img
                    src={revenue.icon}
                    alt=""
                    className="w-[50px] invert-[1]"
                  />
                  <p>{revenue.description}</p>
                  <p>{revenue.username}</p>
                  <p>{revenue.amount}</p>
                  {revenue.createdAt instanceof Timestamp
                    ? new Date(
                        revenue.createdAt.seconds * 1000
                      ).toLocaleDateString()
                    : "Invalid date"}
                </div>
              );
            })
          )}
          {revenues?.length === 0 && <p>You don't have any revenues</p>}
        </div> */}
    </div>
  );
};

export default Home;
