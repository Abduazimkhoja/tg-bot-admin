import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

export const Tooltip = ({ children, message, side, className }: Props) => {
	return (
		<div
			className={cn(
				"tooltip w-fit",
				{
					"tooltip-top": side === "top",
					"tooltip-right": side === "right",
					"tooltip-bottom": side === "bottom",
					"tooltip-left": side === "left",
				},
				className,
			)}
		>
			<div className="tooltip-content">
				<div className="text-base font-black">{message}</div>
			</div>
			{children}
		</div>
	);
};

interface Props {
	message: string;
	children: ReactNode;
	className?: string;
	side?: "top" | "right" | "bottom" | "left";
}
