import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

export const PageHead = ({
	children,
	className,
	title,
	...restProps
}: Props) => {
	return (
		<div
			className={cn("flex items-center justify-between mb-8", className)}
			{...restProps}
		>
			<p className="text-2xl font-bold">{title}</p>
			{children}
		</div>
	);
};

interface Props {
	className?: string;
	title: ReactNode;
	children?: ReactNode;
}
