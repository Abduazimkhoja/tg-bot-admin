import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import { PopoverContent, PopoverManual, PopoverTrigger } from "./manual";

export const Popover = ({
	label,
	triggerProps,
	children,
	className,
}: Props) => {
	return (
		<PopoverManual>
			<PopoverTrigger {...triggerProps}>{label}</PopoverTrigger>
			<PopoverContent className={cn("w-fit", className)}>
				{children}
			</PopoverContent>
		</PopoverManual>
	);
};

interface Props {
	triggerProps?: ComponentProps<typeof PopoverTrigger>;
	label: ReactNode;
	children: ReactNode;
	className?: string;
}
