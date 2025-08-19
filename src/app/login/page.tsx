import type { PageProps } from "next";
import LoginForm from "./login-form";

const Page = async ({ params, searchParams }: PageProps) => {
	const { locale } = await params;
	const { search } = await searchParams;

	return (
		<div className="size-full bg-gray-700 h-screen flex-center">
			<div className="w-md h-fit space-y-2.5 p-4 py-8 bg-gray-800 rounded-lg shadow-lg">
				<h1 className="text-2xl font-bold text-center mb-5 text-white">
					Вход в админку
				</h1>
				<LoginForm />
			</div>
		</div>
	);
};

export default Page;
