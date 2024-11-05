import { auth } from "@/config/firebase";
import { useUser } from "@/hooks/useUser";
import { signOut } from "firebase/auth";
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

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      Splitsy Main Dashboard: {user?.email}{" "}
      <button className="bg-customCyan p-4" onClick={() => handleLogout()}>
        Wyloguj się
      </button>
    </div>
  );
};

export default Home;
