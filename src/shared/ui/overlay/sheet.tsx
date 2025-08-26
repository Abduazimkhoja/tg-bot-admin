"use client";

import * as SheetPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/shared/lib/cn";
import { Button } from "../form/button";

function SheetManual({ ...props }: ComponentProps<typeof SheetPrimitive.Root>) {
	return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

function SheetTrigger({
	className,
	...props
}: ComponentProps<typeof SheetPrimitive.Trigger>) {
	return (
		<SheetPrimitive.Trigger
			className={cn("cursor-pointer", className)}
			data-slot="sheet-trigger"
			{...props}
		/>
	);
}

function SheetClose({ ...props }: ComponentProps<typeof SheetPrimitive.Close>) {
	return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetPortal({
	...props
}: ComponentProps<typeof SheetPrimitive.Portal>) {
	return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

function SheetOverlay({
	className,
	...props
}: ComponentProps<typeof SheetPrimitive.Overlay>) {
	return (
		<SheetPrimitive.Overlay
			data-slot="sheet-overlay"
			className={cn(
				"data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/40 backdrop-blur-xs",
				className,
			)}
			{...props}
		/>
	);
}

function SheetContent({
	className,
	children,
	side = "right",
	...props
}: ComponentProps<typeof SheetPrimitive.Content> & {
	side?: "top" | "right" | "bottom" | "left";
}) {
	return (
		<SheetPortal>
			<SheetOverlay />
			<SheetPrimitive.Content
				data-slot="sheet-content"
				className={cn(
					"bg-white data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
					side === "right" &&
						"data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4  shadow-2xl sm:max-w-sm",
					side === "left" &&
						"data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 shadow-2xl sm:max-w-sm",
					side === "top" &&
						"data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto shadow-2xl",
					side === "bottom" &&
						"data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto shadow-2xl",
					className,
				)}
				{...props}
			>
				{children}
				<SheetClose asChild>
					<Button className="btn-circle btn-sm btn-ghost absolute top-2.5 right-3">
						<XIcon className="size-5" />
						<span className="sr-only">Close</span>
					</Button>
				</SheetClose>
			</SheetPrimitive.Content>
		</SheetPortal>
	);
}

function SheetHeader({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="sheet-header"
			className={cn("flex flex-col gap-1.5 p-4", className)}
			{...props}
		/>
	);
}

function SheetFooter({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="sheet-footer"
			className={cn("mt-auto flex flex-col gap-2 p-4", className)}
			{...props}
		/>
	);
}

function SheetTitle({
	className,
	...props
}: ComponentProps<typeof SheetPrimitive.Title>) {
	return (
		<SheetPrimitive.Title
			data-slot="sheet-title"
			className={cn("text-foreground font-semibold", className)}
			{...props}
		/>
	);
}

function SheetDescription({
	className,
	...props
}: ComponentProps<typeof SheetPrimitive.Description>) {
	return (
		<SheetPrimitive.Description
			data-slot="sheet-description"
			className={cn("text-muted-foreground text-sm", className)}
			{...props}
		/>
	);
}

export {
	SheetManual,
	SheetTrigger,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetFooter,
	SheetTitle,
	SheetDescription,
};
