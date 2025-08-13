"use client";

import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import {
	SelectContent,
	SelectItem,
	SelectManual,
	SelectTrigger,
	SelectValue,
} from "@/shared/ui";

export const Select = <T extends SelectItemsType>({
	items,
	className,
	defaultValue,
	firstSelected,
	placeholder,
	showArrow,
	...restProps
}: Props<T>) => {
	return (
		<SelectManual
			defaultValue={firstSelected ? items[0].value : defaultValue}
			{...restProps}
		>
			<SelectTrigger showArrow={showArrow} className={cn(className)}>
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent>
				{items.map(({ value, label, ...restProps }) => (
					<SelectItem key={value} value={value} {...restProps}>
						{label}
					</SelectItem>
				))}
			</SelectContent>
		</SelectManual>
	);
};

type Props<T extends SelectItemsType = SelectItemsType> = {
	items: T;
	className?: string;
	defaultValue?: T[number]["value"];
	firstSelected?: boolean;
	placeholder?: string;
	showArrow?: boolean;
} & ComponentProps<typeof SelectManual>;

export type SelectItemsType = {
	label: ReactNode;
	value: string;
	disabled?: boolean;
}[];
