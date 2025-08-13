import Link from "next/link";
import type { ComponentProps } from "react";

export const LinkButton = ({ className, children, ...restProps }: Props) => {
	return (
		<Link className="btn" {...restProps}>
			{children}
		</Link>
	);
};

interface Props extends ComponentProps<typeof Link> {}
