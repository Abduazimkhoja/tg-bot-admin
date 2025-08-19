import { ROUTES_LIST } from "@/constants/routes-list.const";
import { LinkButton } from "@/shared/ui";

const Page = () => {
	// return redirect("/");
	return (
		<div className="bg-slate-800 w-full flex-center flex-col">
			<p className="text-[400px] text-white opacity-[3%] font-bold ">404</p>

			<div className="absolute flex-center flex-col">
				<p className="text-9xl text-white font-semibold uppercase">Not Found</p>
				<LinkButton
					href={ROUTES_LIST.home}
					className="btn-xl btn-warning mt-10"
				>
					Вернутся на главную
				</LinkButton>
			</div>
		</div>
	);
};

export default Page;
