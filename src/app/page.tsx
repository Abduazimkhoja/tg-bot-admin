import type { PageProps } from "next";

const Page = async ({ params, searchParams }: PageProps) => {
	// const { locale } = await params;
	// const { search } = await searchParams;

	return <div>root page</div>;
};

export default Page;
