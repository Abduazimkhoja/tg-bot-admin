import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/shared/lib/cn";

export const LinkButton = ({ className, children, ...restProps }: Props) => {
	return (
		<Link className={cn("btn", className)} {...restProps}>
			{children}
		</Link>
	);
};

interface Props extends ComponentProps<typeof Link> {}
