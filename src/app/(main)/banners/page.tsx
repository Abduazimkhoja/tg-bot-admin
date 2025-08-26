import { Plus } from "lucide-react";
import type { PageProps } from "next";
import { Button } from "@/shared/ui";
import { PageHead } from "@/shared/ui/layout/page-head";
import { BannerList } from "./banner-list";
import { BannerSheet } from "./features/banner-sheet";

const Page = async ({ params, searchParams }: PageProps) => {
	// const { locale } = await params;
	// const { search } = await searchParams;

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
			<BannerList />
			{/* </Suspense> */}
		</>
	);
};

export default Page;
