"use client";

import { cn } from "@/shared/lib/cn";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { CircleIcon, Dot } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

function RadioGroup({
	className,
	...props
}: ComponentProps<typeof RadioGroupPrimitive.Root>) {
	return (
		<RadioGroupPrimitive.Root
			data-slot="radio-group"
			className={cn("grid gap-3", className)}
			{...props}
		/>
	);
}

function RadioGroupItem({
	className,
	beforeElement,
	afterElement,
	...props
}: RadioGroupItemProps) {
	return (
		<label className="label cursor-pointer  select-none leading-[normal]">
			{beforeElement}

			<RadioGroupPrimitive.Item
				data-slot="radio-group-item"
				className={cn(
					"radio",
					// "border-input text-primary size-4 rounded-full border-red-400 shadow-xs transition-[color,box-shadow] focus-visible:ring-4 focus-visible:outline-1 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:focus-visible:ring-0",
					className,
				)}
				{...props}
			>
				<RadioGroupPrimitive.Indicator
					data-slot="radio-group-indicator"
					className="flex-center size-full text-current [&>svg]:flex-center [&>svg]:size-full"
				>
					{/* <CircleIcon className="size-full rounded-full" strokeWidth={2} /> */}
					<Dot />
				</RadioGroupPrimitive.Indicator>
			</RadioGroupPrimitive.Item>

			{afterElement}
		</label>
	);
}

interface RadioGroupItemProps
	extends ComponentProps<typeof RadioGroupPrimitive.Item> {
	beforeElement?: ReactNode;
	afterElement?: ReactNode;
}

export { RadioGroup, RadioGroupItem };
