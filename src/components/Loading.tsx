import { Loader2 } from "lucide-react";

const Loading = () => {
	return (
		<div className="bg-white h-screen flex items-center justify-center">
			<Loader2 size={60} className="animate-spin text-customCyan" />
		</div>
	);
};

export default Loading;
