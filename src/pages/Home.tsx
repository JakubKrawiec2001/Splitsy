import { useUser } from "@/hooks/useUser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    if (!user) {
      navigate("/sign-in");
    }
  }, [user, navigate]);

  return (
    <div className="flex flex-col gap-6 items-center justify-center size-full bg-customGray rounded-2xl p-4">
      <div className="size-full">Splitsy Main Dashboard: {user?.email} </div>
    </div>
  );
};

export default Home;
