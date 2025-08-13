"use client";

import type { ComponentProps } from "react";
import { cn } from "@/shared/lib/cn";

function TableManual({ className, ...props }: ComponentProps<"table">) {
	return (
		<div
			data-slot="table-container"
			className="relative w-full border border-gray-100 overflow-auto rounded-xl group-has-data-pending:animate-pulse"
		>
			<table
				data-slot="table"
				className={cn("w-full caption-bottom text-sm", className)}
				{...props}
			/>
		</div>
	);
}

function TableHeader({ className, ...props }: ComponentProps<"thead">) {
	return (
		<thead
			data-slot="table-header"
			className={cn(
				"[&_tr]:border-b sticky top-0 bg-gray-50 [&_tr]:border-gray-100 font-semibold text-sm px-4 py-1",
				className,
			)}
			{...props}
		/>
	);
}

function TableBody({ className, ...props }: ComponentProps<"tbody">) {
	return (
		<tbody
			data-slot="table-body"
			className={cn("[&_tr:last-child]:border-0", className)}
			{...props}
		/>
	);
}

function TableFooter({ className, ...props }: ComponentProps<"tfoot">) {
	return (
		<tfoot
			data-slot="table-footer"
			className={cn(
				"bg-muted/50 border-t font-medium [&>tr]:last:border-b-0 border-gray-100",
				className,
			)}
			{...props}
		/>
	);
}

function TableRow({ className, ...props }: ComponentProps<"tr">) {
	return (
		<tr
			data-slot="table-row"
			className={cn(
				"hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors border-gray-100",
				className,
			)}
			{...props}
		/>
	);
}

function TableHead({ className, ...props }: ComponentProps<"th">) {
	return (
		<th
			data-slot="table-head"
			className={cn(
				"relative text-foreground h-10 px-5 py-2.5 text-start first-letter:uppercase font-semibold align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
				className,
			)}
			{...props}
		/>
	);
}

function TableCell({ className, ...props }: ComponentProps<"td">) {
	return (
		<td
			data-slot="table-cell"
			className={cn(
				"px-5 py-1 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
				className,
			)}
			{...props}
		/>
	);
}

function TableCaption({ className, ...props }: ComponentProps<"caption">) {
	return (
		<caption
			data-slot="table-caption"
			className={cn("text-muted-foreground mt-4 text-sm", className)}
			{...props}
		/>
	);
}

export {
	TableManual,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
};
