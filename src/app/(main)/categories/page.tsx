import { Plus } from "lucide-react";
import type { PageProps } from "next";
import { Suspense } from "react";
import { searchParamsCache } from "@/shared/lib/cached-search-params";
import { Button, Skeleton } from "@/shared/ui";
import { PageHead } from "@/shared/ui/layout/page-head";
import { CategorySheet } from "./form/category-sheet";
import { PageTable } from "./page-table";

const Page = async ({ params, searchParams }: PageProps) => {
	// const { locale } = await params;
	await searchParamsCache.parse(searchParams);

	return (
		<>
			<PageHead title="Категории">
				<CategorySheet
					title="Создать категорию"
					trigger={
						<Button>
							<Plus strokeWidth={1.5} size={20} /> Добавить
						</Button>
					}
				/>
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
