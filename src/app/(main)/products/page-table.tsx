import { Pen } from "lucide-react";
import { getAllProducts } from "@/api/products/api";
import { ROUTES_LIST } from "@/constants/routes-list.const";
import { searchParamsCache } from "@/shared/lib/cached-search-params";
import {
	LinkButton,
	Pagination,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableManual,
	TableRow,
} from "@/shared/ui";
import { EmptyContent } from "@/shared/ui/layout/empty-content";
import { DeleteProduct } from "./delete-product";
import { TableImageCell } from "./table-image-cell";

export const PageTable = async () => {
	const { perPage, page, query } = searchParamsCache.all();

	const { data: products, pagination } = await getAllProducts({
		searchParams: { page, perPage, search: query },
	});

	return !products.length ? (
		<EmptyContent className="h-80" />
	) : (
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
					{products.map((product) => (
						<TableRow key={product.id}>
							<TableCell>
								<TableImageCell imageUrl={product.images?.[0]} />
							</TableCell>
							<TableCell>{product.name.ru}</TableCell>
							<TableCell className="space-x-2">
								<LinkButton
									href={ROUTES_LIST.product(product.id)}
									className="btn-square size-7 btn-info"
								>
									<Pen className="size-[55%]" />
								</LinkButton>
								<DeleteProduct
									elementsCount={products.length}
									productId={product.id}
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
