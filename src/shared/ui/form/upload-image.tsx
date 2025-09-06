"use client";

import { Plus, Trash2 } from "lucide-react";
import { type ChangeEvent, type ComponentProps, useRef, useState } from "react";
import toast from "react-hot-toast";
import { IMAGE_ACCEPTED_TYPES } from "@/constants/image.const";
import { cn } from "@/shared/lib/cn";
import { NextImage } from "../media/next-image";
import { ViewImage } from "../overlay/view-image";
import { Button } from "./button";

export const UploadImage = ({
	multiple,
	showToast,
	limit = multiple ? 5 : 1,
	wrapperClassName,
	onChange,
	onRemove,
	disabled,
	triggerProps,
	value,
	...restProps
}: Props) => {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [isDragging, setIsDragging] = useState(false);

	const values = !value ? [] : Array.isArray(value) ? value : [value];

	const changeFile = (
		files: ChangeEvent<HTMLInputElement>["target"]["files"],
	) => {
		if (!files) return;
		let filesList = Array.from(files);

		if (filesList.length + values.length > limit) {
			toast.error(`Максимум ${limit} фото`);
			filesList = filesList.slice(0, limit - values.length);
		}
		// const validateImage = imageFileValidation(filesList);

		// if (validateImage.error) {
		// 	const message = validateImage.error.issues?.[0].message;

		// 	showToast && toast.error(message);
		// 	return;
		// }

		if (multiple) {
			onChange?.(filesList);
		} else {
			onChange?.(filesList[0]);
		}
	};

	const handleDragOver = (e: React.DragEvent<HTMLButtonElement>) => {
		if (disabled) return;
		e.preventDefault(); // чтобы файл не открылся
		setIsDragging(true);
	};

	const handleDragLeave = () => {
		if (disabled) return;
		setIsDragging(false);
	};

	const handleDrop = (e: React.DragEvent<HTMLButtonElement>) => {
		if (disabled) return;
		e.preventDefault();
		changeFile(e.dataTransfer.files);
		setIsDragging(false);
	};

	return (
		<div {...restProps} className={cn("overflow-hidden", restProps?.className)}>
			<input
				disabled={disabled}
				className="sr-only"
				ref={fileInputRef}
				type="file"
				multiple={multiple}
				accept={IMAGE_ACCEPTED_TYPES.join(", ")}
				max={limit - values.length}
				onChange={({ target: { files } }) => changeFile(files)}
			/>
			<div className="relative flex gap-5 overflow-x-auto">
				{limit > values.length && (
					<div
						className={cn("bg-white sticky left-0 z-20", {
							"pr-2": multiple && values.length > 0,
						})}
					>
						<button
							disabled={disabled}
							onDragOver={handleDragOver}
							onDragLeave={handleDragLeave}
							onDrop={handleDrop}
							type="button"
							className={cn(
								"size-40 rounded-xl bg-gray-50 border-[3px] border-dashed border-gray-300 cursor-pointer transition-colors flex-none gap-1 text-gray-200",
								"disabled:cursor-not-allowed disabled:hover:border-gray-300",
								"hover:border-blue-400 active:border-blue-500 focus:border-blue-500 focus-visible:border-blue-500 has-focus-within:border-blue-500",
								{ "border-blue-500 bg-blue-50 text-blue-500 ": isDragging },
								wrapperClassName,
							)}
							onClick={() => fileInputRef.current?.click()}
							{...triggerProps}
						>
							<Plus
								className={cn("mx-auto size-16", { "rotate-45": disabled })}
							/>
						</button>
					</div>
				)}
				{values.map((image, index) => {
					const url =
						typeof image === "string" ? image : URL.createObjectURL(image);

					return (
						<div
							key={url}
							className={cn(
								"relative size-40 overflow-hidden rounded-xl flex-none bg-gray-100 border-[3px] border-gray-300 cursor-pointer transition-colors text-gray-200",
								wrapperClassName,
							)}
						>
							<NextImage
								className="size-full object-contain"
								key={url}
								fill
								src={url}
								alt="local image"
							/>
							<div className="absolute inset-0 z-10 flex-center gap-2  bg-black/60 opacity-0 hover:opacity-100 transition-opacity">
								<ViewImage imageUrl={url} />

								<Button
									onClick={() => onRemove?.(index)}
									className="btn-error btn-square"
								>
									<Trash2 className="size-4" />
								</Button>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

type Props = MultipleUpload | SingleUpload;

interface MultipleUpload extends BaseProps {
	limit?: number;
	multiple: true;
	onChange: (value: File[]) => void;
	value: (File | string)[];
}

interface SingleUpload extends BaseProps {
	limit?: never;
	multiple: false;
	onChange: (value: File) => void;
	value: File | string;
}

interface BaseProps {
	className?: string;
	disabled?: boolean;
	showToast?: boolean;
	wrapperClassName?: string;
	triggerProps?: ComponentProps<typeof Button>;
	onRemove?: (index: number) => void;
}
