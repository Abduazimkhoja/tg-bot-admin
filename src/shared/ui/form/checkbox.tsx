"use client";

import { cn } from "@/shared/lib/cn";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon, Minus } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

function Checkbox({
	className,
	beforeELement,
	afterElement,
	indeterminate,
	icon,
	...props
}: CheckboxProps) {
	return (
		<label className="label cursor-pointer select-none leading-[normal]">
			{beforeELement}

			<CheckboxPrimitive.Root
				data-slot="checkbox"
				className={cn(
					"checkbox",
					// "data-[state=checked]:bg-blue-400 data-[state=checked]:text-white data-[state=checked]:border-blue-400",
					// "size-5 rounded-[25%] peer cursor-pointer border-input  ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50  shrink-0  border shadow-xs transition-[color,box-shadow] focus-visible:ring-4 focus-visible:outline-1 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:focus-visible:ring-0",
					className,
				)}
				{...props}
			>
				<CheckboxPrimitive.Indicator
					data-slot="checkbox-indicator"
					className="flex-center text-current [&>svg]:size-[88%]"
				>
					{icon ||
						(indeterminate ? (
							<Minus strokeWidth={4} />
						) : (
							<CheckIcon strokeWidth={4} />
						))}
				</CheckboxPrimitive.Indicator>
			</CheckboxPrimitive.Root>

			{afterElement}
		</label>
	);
}

interface CheckboxProps extends ComponentProps<typeof CheckboxPrimitive.Root> {
	beforeELement?: ReactNode;
	afterElement?: ReactNode;
	indeterminate?: boolean;
	icon?: ReactNode;
}

export { Checkbox };
