import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

export const PageHead = ({
	children,
	className,
	title,
	...restProps
}: Props) => {
	return (
		<header
			className={cn(
				"flex items-center justify-between mb-8 text-slate-500 sticky top-0 z-40 bg-white border-b border-gray-200 px-7 py-5",
				className,
			)}
			{...restProps}
		>
			<h1 className="text-2xl font-bold">{title}</h1>
			{children}
		</header>
	);
};

interface Props {
	className?: string;
	title: ReactNode;
	children?: ReactNode;
}
