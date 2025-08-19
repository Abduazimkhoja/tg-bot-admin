"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useQueryStates } from "nuqs";
import { useTransition } from "react";
import { PAGINATION_LIMITS } from "@/constants/pagination.const";
import { searchParamsParsers } from "@/shared/lib/cached-search-params";
import { cn } from "@/shared/lib/cn";
import { perPageParser } from "@/shared/lib/nuqs-custom-parsers/per-page-parser";
import { Button, Select } from "@/shared/ui";
import { PaginationContent, PaginationItem, PaginationManual } from "./manual";

export const Pagination = ({ totalPages }: Props) => {
	const [{ currentPage, perPage }, setSearchParams] =
		useQueryStates(searchParamsParsers);
	const [pending, startTransition] = useTransition();

	const visiblePages = 6; // Количество видимых страниц, включая первую и последнюю

	const getPageNumbers = () => {
		const pages = [];
		const startPage = Math.max(
			2,
			currentPage - Math.floor(visiblePages / 2) + 1,
		);
		const endPage = Math.min(
			totalPages - 1,
			currentPage + Math.floor(visiblePages / 2) - 1,
		);

		pages.push(1); // Всегда добавляем первую страницу

		if (startPage > 2) {
			pages.push("..."); // Многоточие, если есть пропущенные страницы
		}

		for (let i = startPage; i <= endPage; i++) {
			pages.push(i);
		}

		if (endPage < totalPages - 1) {
			pages.push("..."); // Многоточие в конце
		}

		if (totalPages > 1) {
			pages.push(totalPages); // Всегда добавляем последнюю страницу
		}

		return pages;
	};

	const pageNumbers = getPageNumbers();

	const getMiddlePage = (index: number) => {
		const previousPage = +pageNumbers[index - 1];
		const nextPage = +pageNumbers[index + 1];

		const calcMiddlePage = previousPage + (nextPage - previousPage) / 2;

		return Math.trunc(calcMiddlePage);
	};

	const perPageOptions = PAGINATION_LIMITS.map((limit) => ({
		label: limit.toString(),
		value: limit.toString(),
	}));

	return (
		<div data-pending={pending ? "" : undefined} className="flex pl-24 mt-5">
			<PaginationManual>
				<PaginationContent>
					<PaginationItem>
						<Button
							title={String(currentPage - 1)}
							onClick={() =>
								setSearchParams(
									{
										currentPage: currentPage - 1,
									},
									{ startTransition },
								)
							}
							className={cn("btn-ghost", {
								"btn-disabled": currentPage === 1,
							})}
						>
							<ChevronLeftIcon />
						</Button>
						{/* <PaginationNext
							className={cn({
								"btn-disabled": currentPage === 1,
							})}
							href={{
								query: {
									currentPage: currentPage - 1,
								},
							}}
						/> */}
					</PaginationItem>

					{pageNumbers.map((page, index) => (
						<PaginationItem key={index.toString()}>
							{
								<Button
									className={cn("btn-ghost", {
										"btn-active": currentPage === page,
									})}
									onClick={() =>
										setSearchParams(
											{
												currentPage:
													page === "..." ? getMiddlePage(index) : Number(page),
											},
											{ startTransition },
										)
									}
									title={
										page === "..."
											? getMiddlePage(index).toString()
											: page.toString()
									}
								>
									{page}
								</Button>
								// <PaginationLink
								// 	className="group"
								// 	href={{
								// 		query: {
								// 			currentPage: page === "..." ? getMiddlePage(index) : page,
								// 		},
								// 	}}
								// 	title={
								// 		page === "..."
								// 			? getMiddlePage(index).toString()
								// 			: page.toString()
								// 	}
								// 	isActive={currentPage === page}
								// >
								// 	{page}
								// </PaginationLink>
							}
						</PaginationItem>
					))}

					<PaginationItem>
						<Button
							title={String(currentPage + 1)}
							onClick={() =>
								setSearchParams(
									{
										currentPage: currentPage + 1,
									},
									{ startTransition },
								)
							}
							className={cn("btn-ghost", {
								"btn-disabled": currentPage === totalPages,
							})}
						>
							<ChevronRightIcon />
						</Button>
						{/* <PaginationNext
							className={cn({
								"btn-disabled": currentPage === totalPages,
							})}
							href={{
								query: {
									currentPage: currentPage + 1,
								},
							}}
						/> */}
					</PaginationItem>
				</PaginationContent>
			</PaginationManual>

			<Select
				onValueChange={(value) =>
					setSearchParams(
						{
							perPage: perPageParser(value),
							currentPage: 1,
						},
						{ startTransition },
					)
				}
				defaultValue={perPage.toString()}
				className="w-24"
				items={perPageOptions}
			/>
		</div>
	);
};

interface Props {
	totalPages: number;
}
