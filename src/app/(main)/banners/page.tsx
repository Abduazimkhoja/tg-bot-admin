import { Plus } from "lucide-react";
import type { PageProps } from "next";
import { searchParamsCache } from "@/shared/lib/cached-search-params";
import { Button } from "@/shared/ui";
import { PageHead } from "@/shared/ui/layout/page-head";
import { BannerList } from "./banner-list";
import { BannerSheet } from "./form/banner-sheet";

const Page = async ({ params, searchParams }: PageProps) => {
	// const { locale } = await params;
	await searchParamsCache.parse(searchParams);

	// const bannersPromise = getAllBanners();

	return (
		<>
			<PageHead title="Баннеры">
				<BannerSheet
					title="Создать баннер"
					trigger={
						<Button>
							<Plus strokeWidth={1.5} size={20} /> Добавить
						</Button>
					}
				/>
			</PageHead>

			{/* <Suspense fallback={<Skeleton className="h-40 w-full" />}> */}
			<section className="main-content">
				<BannerList />
			</section>
			{/* </Suspense> */}
		</>
	);
};

export default Page;
