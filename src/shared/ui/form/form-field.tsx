import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

export const FormField = ({ className, children, label, error }: Props) => {
	return (
		<label className={cn("fieldset", className)}>
			<span className="fieldset-legend">{label}</span>
			{children}
			{error && <span className="label text-red-400">{error}</span>}
		</label>
	);
};

interface Props {
	className?: string;
	label: string;
	error?: string | null | undefined;
	children: ReactNode;
}
