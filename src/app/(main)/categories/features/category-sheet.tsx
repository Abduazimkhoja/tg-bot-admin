"use client";
import type { ReactNode } from "react";
import type { CategoryItem } from "@/api/categories/type";
import { useTransition } from "@/shared/hooks";
import {
	SheetContent,
	SheetHeader,
	SheetManual,
	SheetTitle,
	SheetTrigger,
} from "@/shared/ui";
import { CategoryForm } from "./category-form";

export const CategorySheet = ({ category, title, trigger }: Props) => {
	const [pending, startTransition] = useTransition();

	return (
		<SheetManual>
			<SheetTrigger asChild>{trigger}</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>{title}</SheetTitle>
				</SheetHeader>

				<CategoryForm
					pending={pending}
					startTransition={startTransition}
					category={category}
				/>
			</SheetContent>
		</SheetManual>
	);
};

interface Props {
	category?: CategoryItem;
	title: string;
	trigger: ReactNode;
}
