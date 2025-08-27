"use client";

import { ArrowLeft, ArrowRight, Eye } from "lucide-react";
import { useState } from "react";
import { cn } from "@/shared/lib/cn";
import { Button } from "../form/button";
import { NextImage } from "../media/next-image";
import {
	DialogContent,
	DialogHeader,
	DialogManual,
	DialogTitle,
	DialogTrigger,
} from "./dialog";

export const ViewImage = ({ imageUrl, triggerClassName }: Props) => {
	const [viewedImageIndex, setViewedImageIndex] = useState(0);

	return (
		<DialogManual>
			<DialogTrigger asChild>
				<Button
					className={cn("btn-success btn-soft btn-square", triggerClassName)}
				>
					<Eye className="size-[55%]" />
				</Button>
			</DialogTrigger>

			<DialogContent
				// showCloseButton={false}
				className={cn(
					"bg-transparent border-none shadow-none rounded-none",
					"max-w-[80vw] max-h-[80vh]",
				)}
			>
				<DialogHeader className="sr-only">
					<DialogTitle>Просмотр изображения</DialogTitle>
				</DialogHeader>
				{Array.isArray(imageUrl) ? (
					imageUrl.map((image, index) => (
						<div
							key={image}
							className={cn("overflow-hidden hidden", {
								block: index === viewedImageIndex,
							})}
						>
							<NextImage
								className="size-full object-contain"
								width={1000}
								height={1000}
								unoptimized
								src={image}
								alt="local image"
							/>
						</div>
					))
				) : (
					<div className="overflow-hidden">
						<NextImage
							className="size-full object-contain "
							width={1000}
							height={1000}
							unoptimized
							src={imageUrl}
							alt="local image"
						/>
					</div>
				)}

				{Array.isArray(imageUrl) && imageUrl.length > 1 && (
					<div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex justify-center items-center gap-5">
						<Button
							disabled={viewedImageIndex <= 0}
							onClick={() => setViewedImageIndex(viewedImageIndex - 1)}
							className="btn-circle"
						>
							<ArrowLeft />
						</Button>
						<p className="text-center text-gray-100">
							{imageUrl.length} / {viewedImageIndex + 1}
						</p>
						<Button
							disabled={viewedImageIndex >= imageUrl.length - 1}
							onClick={() => setViewedImageIndex(viewedImageIndex + 1)}
							className="btn-circle"
						>
							<ArrowRight />
						</Button>
					</div>
				)}
			</DialogContent>
		</DialogManual>
	);
};

interface Props {
	imageUrl: string[] | string;
	triggerClassName?: string;
}
