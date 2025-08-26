"use client";

import { Plus, Trash2 } from "lucide-react";
import { type ChangeEvent, useRef, useState } from "react";
import toast from "react-hot-toast";
import { IMAGE_ACCEPTED_TYPES } from "@/constants/image.const";
import { cn } from "@/shared/lib/cn";
import { NextImage } from "../media/next-image";
import { ViewImage } from "../overlay/view-image";
import { Button } from "./button";

export const UploadImage = ({
	defaultValue,
	multiple,
	showToast,
	limit = multiple ? 5 : 1,
	wrapperClassName,
	onChange,
	onRemove,
	disabled,
	...restProps
}: Props) => {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [isDragging, setIsDragging] = useState(false);

	const [previewUrls, setPreviewUrls] = useState<string[]>(
		defaultValue ? [defaultValue] : [],
	);

	const appendUrls = (newUrls: string[]) => {
		setPreviewUrls((currentUrls) => [...currentUrls, ...newUrls]);
	};

	const removeUrl = (removedUrl: string) => {
		setPreviewUrls((urls) => urls.filter((url) => url !== removedUrl));
		onRemove?.(removedUrl);
	};

	const changeFile = (
		files: ChangeEvent<HTMLInputElement>["target"]["files"],
	) => {
		if (!files) return;
		const filesList = Array.from(files);

		if (filesList.length + previewUrls.length >= limit) {
			return toast.error(`Максимум ${limit} фото`);
		}
		// const validateImage = imageFileValidation(filesList);

		// if (validateImage.error) {
		// 	const message = validateImage.error.issues?.[0].message;

		// 	showToast && toast.error(message);
		// 	return;
		// }

		appendUrls(filesList.map((file) => URL.createObjectURL(file)));

		onChange?.(multiple ? filesList : filesList[0]);
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
		<div {...restProps}>
			<input
				disabled={disabled}
				className="sr-only"
				ref={fileInputRef}
				type="file"
				multiple={multiple}
				accept={IMAGE_ACCEPTED_TYPES.join(", ")}
				max={limit - previewUrls.length}
				onChange={({ target: { files } }) => changeFile(files)}
			/>
			<div className="relative flex gap-5 overflow-x-auto">
				{limit > previewUrls.length && (
					<div className="bg-white sticky left-0 z-10 pr">
						<button
							disabled={disabled}
							onDragOver={handleDragOver}
							onDragLeave={handleDragLeave}
							onDrop={handleDrop}
							type="button"
							className={cn(
								"disabled:cursor-not-allowed disabled:hover:border-gray-300 size-40 rounded-xl bg-gray-50 border-[3px] border-dashed border-gray-300 cursor-pointer hover:border-blue-400 transition-colors flex-none gap-1 text-gray-200",
								{ "border-blue-500 bg-blue-50 text-blue-500": isDragging },
								wrapperClassName,
							)}
							onClick={() => fileInputRef.current?.click()}
						>
							<Plus
								className={cn("mx-auto size-16", { "rotate-45": disabled })}
							/>
						</button>
					</div>
				)}
				{previewUrls.map((url) => (
					<div
						key={url}
						className={cn(
							"relative size-40 overflow-hidden rounded-xl flex-none bg-gray-100 border-[3px] border-gray-300 cursor-pointer transition-colors text-gray-200",
							wrapperClassName,
						)}
					>
						<NextImage
							className="size-full object-contain"
							hostName={null}
							key={url}
							fill
							src={url}
							alt="local image"
						/>
						<div className="absolute inset-0 z-10 flex-center gap-2  bg-black/60 opacity-0 hover:opacity-100 transition-opacity">
							<ViewImage imageUrl={url} />

							<Button
								onClick={() => removeUrl(url)}
								className="btn-error btn-square"
							>
								<Trash2 className="size-4" />
							</Button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

type Props = {
	disabled?: boolean;
	limit?: number;
	defaultValue?: string;
	multiple?: boolean;
	showToast?: boolean;
	wrapperClassName?: string;
	onRemove?: (value: string) => void;
	onChange?: (value: File | File[]) => void;
};
