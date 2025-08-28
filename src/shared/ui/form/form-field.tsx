import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

export const FormField = ({
	className,
	labelClassName,
	children,
	label,
	required,
	error,
	htmlFor,
	wrappedLabel = true,
}: Props) => {
	return wrappedLabel ? (
		<label
			htmlFor={htmlFor}
			className={cn("fieldset", { required }, className)}
		>
			<span className={cn("fieldset-legend", labelClassName)}>{label}</span>
			{children}
			{error && (
				<span className={"label text-error leading-none mt-1"}>{error}</span>
			)}
		</label>
	) : (
		<span className={cn("fieldset", { required }, className)}>
			<label
				htmlFor={htmlFor}
				className={cn("fieldset-legend", labelClassName)}
			>
				{label}
			</label>
			{children}
			{error && (
				<span className={"label text-error leading-none mt-1"}>{error}</span>
			)}
		</span>
	);
};

interface Props {
	wrappedLabel?: boolean;
	labelClassName?: string;
	htmlFor?: string;
	className?: string;
	label: ReactNode;
	error?: string | null | undefined;
	children: ReactNode;
	required?: boolean;
}
