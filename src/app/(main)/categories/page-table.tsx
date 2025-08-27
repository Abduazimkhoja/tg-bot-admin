import { Pen } from "lucide-react";
import { getAllCategories } from "@/api/categories/api";
import { searchParamsCache } from "@/shared/lib/cached-search-params";
import {
	Button,
	Pagination,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableManual,
	TableRow,
} from "@/shared/ui";
import { DeleteCategory } from "./delete-category";
import { CategorySheet } from "./features/category-sheet";
import { TableImageCell } from "./table-image-cell";

export const PageTable = async () => {
	const { perPage, page, query } = searchParamsCache.all();

	const { data: categories, pagination } = await getAllCategories({
		searchParams: { page, perPage, search: query },
	});

	return (
		<>
			<TableManual className="animate-with-page-pending">
				{/* <TableCaption>A list of your recent invoices.</TableCaption> */}
				<TableHeader>
					<TableRow>
						<TableHead>Фото</TableHead>
						<TableHead className="w-full">Название</TableHead>
						<TableHead className="text-center">Действия</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{categories.map((category) => (
						<TableRow key={category.id}>
							<TableCell>
								<TableImageCell imageUrl={category.image} />
							</TableCell>
							<TableCell>{category.name.ru}</TableCell>
							<TableCell className="space-x-2">
								<CategorySheet
									category={category}
									title="Редактировать баннер"
									trigger={
										<Button className="btn-square size-7 btn-info">
											<Pen className="size-[55%]" />
										</Button>
									}
								/>
								<DeleteCategory
									elementsCount={categories.length}
									categoryId={category.id}
								/>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</TableManual>
			<Pagination
				totalElements={pagination.totalElements}
				totalPages={pagination.totalPages}
			/>
		</>
	);
};
