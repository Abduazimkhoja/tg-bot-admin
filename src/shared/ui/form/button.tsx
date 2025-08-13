import type { ComponentProps } from "react";
import { cn } from "@/shared/lib/cn";
import { Loading } from "@/shared/ui";

export const Button = ({
	className,
	children,
	loading,
	disabled,
	...restProps
}: Props) => {
	return (
		<button
			type="button"
			className={cn("btn", { relative: loading }, className)}
			disabled={disabled || loading}
			{...restProps}
		>
			{!loading ? (
				children
			) : (
				<>
					<span className="absolute inset-0 flex-center">
						<Loading className="loading-spinner loading-xs" />
					</span>
					<span className={cn({ invisible: loading })}>{children}</span>
				</>
			)}
		</button>
	);
};

interface Props extends ComponentProps<"button"> {
	loading?: boolean;
	// size?: "xs" | "sm" | "md" | "lg" | "xl";
	// color?:
	// 	| "neutral"
	// 	| "primary"
	// 	| "secondary"
	// 	| "accent"
	// 	| "info"
	// 	| "success"
	// 	| "warning"
	// 	| "error";
	// variant?:
	// 	| "soft"
	// 	| "outline"
	// 	| "dash"
	// 	| "ghost"
	// 	| "link"
	// 	| "active"
	// 	| "wide"
	// 	| "disabled";
	// shape?: "square" | "circle" | "block";
}
// "btn-xs"
// "btn-sm"
// "btn-md"
// "btn-lg"
// "btn-xl"
// "btn-neutral"
// "btn-primary"
// "btn-secondary"
// "btn-accent"
// "btn-info"
// "btn-success"
// "btn-warning"
// "btn-error"
// "btn-soft"
// "btn-outline"
// "btn-dash"
// "btn-ghost"
// "btn-link"
// "btn-active"
// "btn-wide"
// "btn-disabled"
// "btn-square"
// "btn-circle"
// "btn-block"
