"use client";
import type { ReactNode } from "react";
import type { PromoCodeItem } from "@/api/promo-codes/type";
import { useTransition } from "@/shared/hooks";
import {
	SheetContent,
	SheetHeader,
	SheetManual,
	SheetTitle,
	SheetTrigger,
} from "@/shared/ui";
import { CategoryForm } from "./promo-code-form";

export const PromoCodeFormSheet = ({ promoCode, title, trigger }: Props) => {
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
					promoCode={promoCode}
				/>
			</SheetContent>
		</SheetManual>
	);
};

interface Props {
	promoCode?: PromoCodeItem;
	title: string;
	trigger: ReactNode;
}
