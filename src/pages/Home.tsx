import { useFetchCurrentUserExpenses } from "@/hooks/useFetchCurrentUserExpenses";
import { useFetchCurrentUserRevenues } from "@/hooks/useFetchCurrentUserRevenues";
import { useUser } from "@/hooks/useUser";
import { Timestamp } from "firebase/firestore";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";

const Home = () => {
  const navigate = useNavigate();
  const { user, userData } = useUser();
  const { data: expenses, isPending: isExpensesLoading } =
    useFetchCurrentUserExpenses(userData?.id);
  const { data: revenues, isPending: isRevenuesLoading } =
    useFetchCurrentUserRevenues(userData?.id);

  useEffect(() => {
    if (!user) {
      navigate("/sign-in");
    }
  }, [user, navigate]);

  ChartJS.register(Tooltip, Legend, ArcElement);

  const pieChartData = {
    labels: expenses?.map((expense) => expense.category),
    datasets: [
      {
        data: expenses?.map((expense) => expense.amount),
        backgroundColor: expenses?.map((expense) => expense.color),
        hoverOffset: 4,
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  return (
    <div className="size-full bg-customGray rounded-2xl p-4">
      <div className="w-[300px]">
        <Doughnut options={options} data={pieChartData} />
        <p>Wydatki</p>
        <div className="flex gap-2">
          {isExpensesLoading ? (
            <Loader2 size={60} className="animate-spin text-customCyan" />
          ) : (
            expenses?.map((expense) => {
              return (
                <div key={expense.id} className="bg-customBlack text-white p-1">
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
        <p className="mt-2">Przychody</p>
        <div className="flex gap-2">
          {isRevenuesLoading ? (
            <Loader2 size={60} className="animate-spin text-customCyan" />
          ) : (
            revenues?.map((revenue) => {
              return (
                <div key={revenue.id} className="bg-customBlack text-white p-1">
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
        </div>
      </div>
    </div>
  );
};

export default Home;
