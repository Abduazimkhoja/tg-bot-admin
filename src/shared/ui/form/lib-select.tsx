"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/shared/lib/cn";

function SelectManual({
	...props
}: ComponentProps<typeof SelectPrimitive.Root>) {
	return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function SelectGroup({
	...props
}: ComponentProps<typeof SelectPrimitive.Group>) {
	return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function SelectValue({
	...props
}: ComponentProps<typeof SelectPrimitive.Value>) {
	return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

function SelectTrigger({
	className,
	children,
	showArrow = true,
	...props
}: ComponentProps<typeof SelectPrimitive.Trigger> & { showArrow?: boolean }) {
	return (
		<SelectPrimitive.Trigger
			data-slot="select-trigger"
			className={cn(
				"outline-none cursor-pointer",
				{
					"select *:data-[slot=select-value]:grow":
						!className?.includes("grow"),
				},
				"text-start *:data-[slot=select-value]:leading-[normal] [&[data-placeholder]>span]:text-gray-400",
				// "*:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&>span]:line-clamp-1",
				// "disabled:cursor-not-allowed disabled:opacity-50",
				// "focus-visible:ring-4 focus-visible:outline-1  aria-invalid:focus-visible:ring-0",
				// "flex h-9 w-full items-center justify-between px-3 py-2 text-sm",
				// "border border-input rounded-md bg-transparent  shadow-xs transition-[color,box-shadow]",
				// "data-[placeholder]:text-muted-foreground aria-invalid:border-destructive ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50",
				className,
			)}
			{...props}
		>
			{children}
			{showArrow && !className?.includes("grow") && (
				<SelectPrimitive.Icon asChild>
					<ChevronDownIcon className="size-4" />
				</SelectPrimitive.Icon>
			)}
		</SelectPrimitive.Trigger>
	);
}

function SelectContent({
	className,
	children,
	position = "popper",
	...props
}: ComponentProps<typeof SelectPrimitive.Content>) {
	return (
		<SelectPrimitive.Portal>
			<SelectPrimitive.Content
				data-slot="select-content"
				className={cn(
					" bg-white text-black data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border shadow-md border-gray-200",
					position === "popper" &&
						"data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
					className,
				)}
				position={position}
				{...props}
			>
				<SelectScrollUpButton />
				<SelectPrimitive.Viewport
					className={cn(
						"p-1",
						position === "popper" &&
							"h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1",
					)}
				>
					{children}
				</SelectPrimitive.Viewport>
				<SelectScrollDownButton />
			</SelectPrimitive.Content>
		</SelectPrimitive.Portal>
	);
}

function SelectLabel({
	className,
	...props
}: ComponentProps<typeof SelectPrimitive.Label>) {
	return (
		<SelectPrimitive.Label
			data-slot="select-label"
			className={cn("px-2 py-1.5 text-sm font-semibold", className)}
			{...props}
		/>
	);
}

function SelectItem({
	className,
	children,
	...props
}: ComponentProps<typeof SelectPrimitive.Item>) {
	return (
		<SelectPrimitive.Item
			data-slot="select-item"
			className={cn(
				"focus:bg-info focus:text-white cursor-pointer relative flex w-full items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
				className,
			)}
			{...props}
		>
			<span className="absolute right-2 flex size-3.5 items-center justify-center">
				<SelectPrimitive.ItemIndicator>
					<CheckIcon className="size-4" />
				</SelectPrimitive.ItemIndicator>
			</span>
			<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
		</SelectPrimitive.Item>
	);
}

function SelectSeparator({
	className,
	...props
}: ComponentProps<typeof SelectPrimitive.Separator>) {
	return (
		<SelectPrimitive.Separator
			data-slot="select-separator"
			className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)}
			{...props}
		/>
	);
}

function SelectScrollUpButton({
	className,
	...props
}: ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
	return (
		<SelectPrimitive.ScrollUpButton
			data-slot="select-scroll-up-button"
			className={cn(
				"flex cursor-default items-center justify-center py-1",
				className,
			)}
			{...props}
		>
			<ChevronUpIcon className="size-4" />
		</SelectPrimitive.ScrollUpButton>
	);
}

function SelectScrollDownButton({
	className,
	...props
}: ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
	return (
		<SelectPrimitive.ScrollDownButton
			data-slot="select-scroll-down-button"
			className={cn(
				"flex cursor-default items-center justify-center py-1",
				className,
			)}
			{...props}
		>
			<ChevronDownIcon className="size-4" />
		</SelectPrimitive.ScrollDownButton>
	);
}

export {
	SelectManual,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectScrollDownButton,
	SelectScrollUpButton,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
};
