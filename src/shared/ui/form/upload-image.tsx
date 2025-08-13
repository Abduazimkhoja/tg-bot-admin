"use client";

import { Plus } from "lucide-react";
import { type ChangeEvent, useRef, useState, useTransition } from "react";
import toast from "react-hot-toast";
import { IMAGE_ACCEPTED_TYPES } from "@/constants/image.const";
import { cn } from "@/shared/lib/cn";
import { imageFileValidation } from "@/shared/lib/validation-schemas/image-file-validation";
import { NextImage } from "../media/next-image";

export const UploadImage = ({
	defaultValue,
	multiple,
	autoUpload,
	showToast,
	onChange,
	...restProps
}: Props) => {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [pending, startTransition] = useTransition();
	const [isDragging, setIsDragging] = useState(false);
	const [imageUrls, setImageUrls] = useState<string[]>(
		defaultValue ? [defaultValue] : [],
	);

	const appendUrl = (url: string) => {
		setImageUrls((urls) => [...urls, url]);
	};

	const removeUrl = (removedUrl: string) => {
		setImageUrls((urls) => urls.filter((url) => url !== removedUrl));
	};

	const uploadFile = (files: File[]) => {
		startTransition(async () => {
			const data = new FormData();

			files.forEach((file, index) => {
				data.append(`file[${index}]`, file);
			});

			await fetch("/api/upload", {
				method: "POST",
				body: data,
			});

			appendUrl("response url");
			autoUpload && onChange?.("response url");

			showToast && toast.success("Изображение загружено");
		});
	};

	const changeFile = (
		files: ChangeEvent<HTMLInputElement>["target"]["files"],
	) => {
		if (!files) return;
		const filesList = Array.from(files);
		const validateImage = imageFileValidation(filesList);

		if (!validateImage.success) {
			showToast && toast.error(validateImage.issues[0].message);
			return;
		}

		if (autoUpload) {
			uploadFile(filesList);
		} else {
			filesList.forEach((file) => {
				appendUrl(URL.createObjectURL(file));
			});

			onChange?.(filesList);
		}
	};

	const handleDragOver = (e: React.DragEvent<HTMLButtonElement>) => {
		e.preventDefault(); // чтобы файл не открылся
		setIsDragging(true);
	};

	const handleDragLeave = () => {
		setIsDragging(false);
	};

	const handleDrop = (e: React.DragEvent<HTMLButtonElement>) => {
		e.preventDefault();
		changeFile(e.dataTransfer.files);
		setIsDragging(false);
	};

	return (
		<div {...restProps}>
			<input
				disabled={pending}
				defaultValue={defaultValue}
				className="sr-only"
				ref={fileInputRef}
				type="file"
				multiple={multiple}
				accept={IMAGE_ACCEPTED_TYPES.join(", ")}
				onChange={({ target: { files } }) => changeFile(files)}
			/>
			<div className="relative flex gap-5 overflow-x-auto pb-2">
				<div className="bg-white sticky left-0 z-10 pr">
					<button
						onDragOver={handleDragOver}
						onDragLeave={handleDragLeave}
						onDrop={handleDrop}
						type="button"
						className={cn(
							"size-40 rounded-xl bg-gray-50 border-[3px] border-dashed border-gray-300 cursor-pointer hover:border-blue-400 transition-colors flex-none gap-1 text-gray-200",
							isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300",
						)}
						onClick={() => fileInputRef.current?.click()}
					>
						<Plus size={60} className="mx-auto" />
					</button>
				</div>
				{imageUrls.map((url) => (
					<div
						key={url}
						className="relative size-40 overflow-hidden rounded-xl flex-none bg-gray-50 border-[3px] border-gray-300 cursor-pointer hover:border-blue-400 transition-colors text-gray-200"
					>
						<NextImage
							className="size-40 object-contain"
							onClick={() => removeUrl(url)}
							selectHost={null}
							key={url}
							fill
							src={url}
							alt="local image"
						/>
					</div>
				))}
			</div>
		</div>
	);
};

type Props = AutoUploadProps | ManualUploadProps;

interface BaseProps {
	defaultValue?: string;
	multiple?: boolean;
	showToast?: boolean;
}

interface AutoUploadProps extends BaseProps {
	autoUpload: true;
	onChange?: (value: string) => void;
}

interface ManualUploadProps extends BaseProps {
	autoUpload?: false;
	onChange?: (value: File | File[]) => void;
}
