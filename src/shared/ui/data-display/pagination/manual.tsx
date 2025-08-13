import {
	ChevronLeftIcon,
	ChevronRightIcon,
	MoreHorizontalIcon,
} from "lucide-react";
import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/shared/lib/cn";

function PaginationManual({ className, ...props }: ComponentProps<"nav">) {
	return (
		<nav
			// role="navigation"
			aria-label="pagination"
			data-slot="pagination"
			className={cn("mx-auto flex w-full justify-center", className)}
			{...props}
		/>
	);
}

function PaginationContent({ className, ...props }: ComponentProps<"ul">) {
	return (
		<ul
			data-slot="pagination-content"
			className={cn("flex flex-row items-center gap-1", className)}
			{...props}
		/>
	);
}

function PaginationItem({ ...props }: ComponentProps<"li">) {
	return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
	isActive?: boolean;
} & ComponentProps<typeof Link>;

function PaginationLink({
	className,
	isActive,
	...props
}: PaginationLinkProps) {
	return (
		<Link
			aria-current={isActive ? "page" : undefined}
			data-slot="pagination-link"
			data-active={isActive}
			className={cn("btn btn-ghost", { "btn-active": isActive }, className)}
			{...props}
		/>
	);
}

function PaginationPrevious({
	className,
	...props
}: ComponentProps<typeof PaginationLink>) {
	return (
		<PaginationLink
			aria-label="Go to previous page"
			className={cn(className)}
			{...props}
		>
			<ChevronLeftIcon />
			{/* <span className="hidden sm:block">Previous</span> */}
		</PaginationLink>
	);
}

function PaginationNext({
	className,
	...props
}: ComponentProps<typeof PaginationLink>) {
	return (
		<PaginationLink
			aria-label="Go to next page"
			className={cn(className)}
			{...props}
		>
			{/* <span className="hidden sm:block">Next</span> */}
			<ChevronRightIcon />
		</PaginationLink>
	);
}

function PaginationEllipsis({ className, ...props }: ComponentProps<"span">) {
	return (
		<span
			data-slot="pagination-ellipsis"
			className={cn("flex size-9 items-center justify-center", className)}
			{...props}
		>
			<MoreHorizontalIcon className="size-4" />
			<span className="sr-only">More pages</span>
		</span>
	);
}

export {
	PaginationManual,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
};
