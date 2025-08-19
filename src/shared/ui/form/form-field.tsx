import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

export const FormField = ({
	className,
	labelClassName,
	children,
	label,
	error,
}: Props) => {
	return (
		<label className={cn("fieldset", className)}>
			<span className={cn("fieldset-legend", labelClassName)}>{label}</span>
			{children}
			{error && (
				<span className={"label text-red-400 leading-none mt-1"}>{error}</span>
			)}
		</label>
	);
};

interface Props {
	labelClassName?: string;
	className?: string;
	label: string;
	error?: string | null | undefined;
	children: ReactNode;
}
