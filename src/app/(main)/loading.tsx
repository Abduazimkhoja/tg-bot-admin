import { Loading } from "@/shared/ui";

const Load = () => {
	return (
		<div className="flex-1 flex-center">
			<Loading className="loading-xl loading-[400px] loading-bars text-blue-400" />
		</div>
	);
};

export default Load;
