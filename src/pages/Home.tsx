import { useUser } from "@/hooks/useUser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const navigate = useNavigate();
	const { user, userData } = useUser();

	useEffect(() => {
		if (!user) {
			navigate("/sign-in");
		}
	}, [user, navigate]);

	return (
		<div className="flex flex-col gap-6 items-center justify-center size-full">
			<div className="size-full">
				Splitsy Main Dashboard: {user?.email}{" "}
				<img src={userData?.avatar} alt="" className="size-[100px]" />
			</div>
		</div>
	);
};

export default Home;
