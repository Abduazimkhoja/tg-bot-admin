import type { PageProps } from "next";
import { redirect } from "next/navigation";
import { ROUTES_LIST } from "@/constants/routes-list.const";

const Page = ({ params, searchParams }: PageProps) => {
	// const { locale } = await params;
	// const { search } = await searchParams;

	return redirect(ROUTES_LIST.products);

	// return <section className="main-content" />;
};

export default Page;
