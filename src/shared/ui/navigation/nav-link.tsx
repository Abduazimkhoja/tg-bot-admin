"use client";
import { useCheckActiveRoute } from "@/shared/hooks/use-check-active-route";
import { cn } from "@/shared/lib/cn";
import { Loading } from "@/shared/ui";
import Link, { useLinkStatus } from "next/link";
import type { ComponentProps } from "react";

export const NavLink = ({
	children,
	className,
	activeClass,
	href,
	...restProps
}: Props) => {
	const hrefPathname = typeof href === "object" ? href.pathname : href;
	const isActiveRoute = useCheckActiveRoute();

	const isActive = hrefPathname && isActiveRoute(hrefPathname);

	return (
		<Link
			href={href}
			className={cn({ [cn("bg-red-500", activeClass)]: isActive }, className)}
			{...restProps}
		>
			{children} <LinkLoadingIndicator className="ml-auto" />
		</Link>
	);
};

const LinkLoadingIndicator = ({ className }: { className?: string }) => {
	const { pending } = useLinkStatus();
	return pending ? <Loading className={cn("loading-xs", className)} /> : null;
};

interface Props extends ComponentProps<typeof Link> {
	activeClass?: string;
}
