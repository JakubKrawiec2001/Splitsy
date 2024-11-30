import { useUser } from "@/hooks/useUser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { Doughnut } from "react-chartjs-2";
// import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    if (!user) {
      navigate("/sign-in");
    }
  }, [user, navigate]);

  // ChartJS.register(Tooltip, Legend, ArcElement);

  // const pieChartData = {
  //   labels: ["Marek", "Tadek", "Kamil", "Kuba"],
  //   datasets: [
  //     {
  //       label: "Money",
  //       data: [3500, 2450, 1540, 4320],
  //       backgroundColor: ["red", "green", "blue", "orange"],
  //       hoverOffset: 4,
  //     },
  //   ],
  // };

  // const options = {
  //   plugins: {
  //     legend: {
  //       display: false,
  //     },
  //   },
  // };

  return (
    <div className="size-full bg-customGray rounded-2xl p-4">
      <p>Splitsy Main Dashboard: {user?.email} </p>
      <div className="w-[300px]">
        {/* <Doughnut options={options} data={pieChartData} /> */}
      </div>
    </div>
  );
};

export default Home;
