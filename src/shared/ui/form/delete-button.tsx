"use client";
import { Trash2, TriangleAlert } from "lucide-react";
import { useState, useTransition } from "react";
import { cn } from "@/shared/lib/cn";
import {
	PopoverContent,
	PopoverManual,
	PopoverTrigger,
} from "../overlay/popover/manual";
import { Button } from "./button";

export const DeleteButton = ({
	onDelete,
	onCancel,
	disabled,
	className,
}: Props) => {
	const [pending, startTransition] = useTransition();
	const [open, setOpen] = useState(false);

	return (
		<PopoverManual open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					disabled={disabled}
					loading={pending}
					className={cn("btn-square btn-error", { open }, className)}
				>
					<Trash2 className="size-[55%]" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-fit px-5 py-3">
				<h4 className="mb-3 flex gap-1.5">
					<TriangleAlert className="text-orange-500 size-5" />
					Точно хотите удалить?
				</h4>

				<div className="flex gap-x-3 justify-end">
					<Button
						onClick={() => {
							onCancel?.();
							setOpen(false);
						}}
						className="btn-sm flex-2"
					>
						Отмена
					</Button>
					<Button
						onClick={() => {
							startTransition(onDelete);
							setOpen(false);
						}}
						className="btn-sm btn-error flex-1"
					>
						Да
					</Button>
				</div>
			</PopoverContent>
		</PopoverManual>
	);
};

interface Props {
	className?: string;
	disabled?: boolean;
	onDelete: () => void;
	onCancel?: () => void;
}
