"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { type ReactNode, useState } from "react";
import { cn } from "@/shared/lib/cn";
import { Loading } from "../feedback/loading";
import {
	PopoverContent,
	PopoverManual,
	PopoverTrigger,
} from "../overlay/popover/manual";
import {
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandManual,
} from "./command";

export function Combobox({
	search,
	searchPlaceholder = "Поиск",
	loading,
	onChange,
	onSearchChange,
	placeholder = "Выберите значение",
	checkedIcon,
	items,
	value,
}: Props) {
	const [open, setOpen] = useState(false);

	return (
		<PopoverManual open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				{/** biome-ignore lint/a11y/useSemanticElements: ignore this error */}
				<button
					type="button"
					role="combobox"
					aria-expanded={open}
					className="select w-60 justify-between cursor-pointer"
				>
					{value
						? items.find((framework) => framework.value === value)?.label
						: placeholder}

					{loading ? (
						<Loading className="loading-xs" />
					) : (
						<ChevronsUpDown className="opacity-50 size-4" />
					)}
				</button>
			</PopoverTrigger>
			<PopoverContent className="w-60 p-0">
				<CommandManual>
					<CommandInput
						onValueChange={onSearchChange}
						value={search}
						placeholder={searchPlaceholder}
						className="h-9"
					/>
					<CommandList>
						<CommandEmpty>
							{!items.length && !search ? "Нет данных" : "Не удалось найти"}
						</CommandEmpty>
						<CommandGroup className="border-gray-200 border-r mr-0.5">
							{items.map(
								(
									{ value: itemValue, label, disabled, className, render },
									index,
								) => (
									<CommandItem
										key={itemValue}
										value={itemValue}
										disabled={disabled}
										className={cn(
											"cursor-pointer data-[selected=true]:bg-blue-500 data-[selected=true]:text-white",
											className,
										)}
										onSelect={(currentValue) => {
											onChange?.(currentValue === value ? "" : currentValue);
											setOpen(false);
										}}
									>
										{render
											? render({ value: itemValue, label }, items, index)
											: label}

										{checkedIcon || (
											<Check
												className={cn(
													"ml-auto",
													value === itemValue ? "opacity-100" : "opacity-0",
												)}
											/>
										)}
									</CommandItem>
								),
							)}
						</CommandGroup>
					</CommandList>
				</CommandManual>
			</PopoverContent>
		</PopoverManual>
	);
}

interface Props {
	checkedIcon?: ReactNode;
	items: {
		value: string;
		label: string;
		disabled?: boolean;
		className?: string;
		render?: (
			item: { value: string; label: string },
			items: Pick<Props["items"][number], "value" | "label">[],
			index: number,
		) => ReactNode;
	}[];
	placeholder?: string;
	searchPlaceholder?: string;
	loading?: boolean;
	value?: string;
	onChange?: (value: string) => void;
	search?: string;
	onSearchChange?: (value: string) => void;
}
