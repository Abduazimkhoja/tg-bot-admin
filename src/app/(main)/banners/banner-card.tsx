"use client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useQueryClient } from "@tanstack/react-query";
import { GripVertical, Pen } from "lucide-react";
import { useSession } from "next-auth/react";
import { deleteBanner } from "@/api/banners/api";
import { API_ENDPOINTS } from "@/constants/api.const";
import { cn } from "@/shared/lib/cn";
import { Button, NextImage } from "@/shared/ui";
import { DeleteButton } from "@/shared/ui/form/delete-button";
import { ViewImage } from "@/shared/ui/overlay/view-image";
import { BannerSheet } from "./form/banner-sheet";

export const BannerCard = (banner: Props) => {
	const session = useSession();
	const token = session.data?.accessToken || "";
	const queryClient = useQueryClient();

	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: banner.id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			className={cn(
				"relative aspect-[2/1] overflow-hidden w-full border border-gray-200 rounded-2xl",
				{
					"z-100 border-none shadow-[0px 10px 20px -5px rgba(0, 0, 0, 0.3), 0px 20px 40px -10px rgba(0, 0, 0, 0.2), 0px 40px 80px -20px rgba(0, 0, 0, 0.1)]":
						isDragging,
				},
			)}
		>
			<NextImage
				src={banner.imageUrl}
				width={300}
				height={100}
				alt="banners"
				className="size-full object-contain"
			/>
			<div className="absolute inset-0 p-2 bg-black/60 z-10 grid gap-2 grid-cols-[1fr_auto_auto_auto] opacity-0 hover:opacity-100 transition-opacity [&:has(.open)]:opacity-100">
				<Button
					{...listeners}
					className="btn-square btn-sm btn-ghost text-white hover:text-black cursor-grab active:cursor-grabbing invisible"
				>
					<GripVertical size={20} />
				</Button>

				<ViewImage triggerClassName="btn-sm" imageUrl={banner.imageUrl} />

				<BannerSheet
					banner={banner}
					title="Редактировать баннер"
					trigger={
						<Button className="btn-square btn-sm btn-info">
							<Pen size={16} />
						</Button>
					}
				/>

				<DeleteButton
					className="btn-sm"
					onDelete={async () => {
						await deleteBanner({ token, id: banner.id });
						queryClient.invalidateQueries({
							queryKey: [API_ENDPOINTS.banners],
						});
					}}
				/>
			</div>
		</div>
	);
};

interface Props {
	imageUrl: string;
	id: number;
}
