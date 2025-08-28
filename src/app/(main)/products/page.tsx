import { Plus } from "lucide-react";
import type { PageProps } from "next";
import { Suspense } from "react";
import { ROUTES_LIST } from "@/constants/routes-list.const";
import { searchParamsCache } from "@/shared/lib/cached-search-params";
import { LinkButton, Skeleton } from "@/shared/ui";
import { PageHead } from "@/shared/ui/layout/page-head";
import { PageTable } from "./page-table";

const Page = async ({ params, searchParams }: PageProps) => {
	// const { locale } = await params;
	await searchParamsCache.parse(searchParams);

	return (
		<>
			<PageHead title="Продукты">
				<LinkButton href={ROUTES_LIST.product("create")}>
					<Plus strokeWidth={1.5} size={20} /> Добавить
				</LinkButton>
			</PageHead>

			<section className="main-content">
				<Suspense fallback={<Skeleton className="h-80 w-full" />}>
					<PageTable />
				</Suspense>
			</section>
		</>
	);
};

export default Page;
