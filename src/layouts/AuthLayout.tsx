import { useUser } from "@/hooks/useUser";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AuthLayout = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <main className="wrapper size-full flex justify-between items-center lg:gap-12 2lg:gap-20 p-6">
      <Outlet />
      <div className="hidden lg:block h-[95vh] w-[50%] 2lg:w-[40%] custom-radial-gradient rounded-[20px]"></div>
    </main>
  );
};

export default AuthLayout;
