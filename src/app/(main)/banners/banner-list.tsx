"use client";
import {
	closestCenter,
	DndContext,
	type DragEndEvent,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import {
	arrayMove,
	rectSwappingStrategy,
	SortableContext,
	sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getAllBanners } from "@/api/banners/api";
import type { BannersList } from "@/api/banners/type";
import { API_ENDPOINTS } from "@/constants/api.const";
import { cn } from "@/shared/lib/cn";
import { SkeletonsList } from "@/shared/ui/feedback/skeletons-list";
import { EmptyContent } from "@/shared/ui/layout/empty-content";
import { BannerCard } from "./banner-card";

export const BannerList = () => {
	const [items, setItems] = useState<BannersList>([]);

	const { isLoading, error, isError } = useQuery({
		queryKey: [API_ENDPOINTS.banners],
		queryFn: async () => {
			const response = await getAllBanners();

			setItems(response?.data || []);

			return response;
		},
	});

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	);

	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event;

		if (active.id !== over?.id) {
			let movedItems: typeof items = [];
			setItems((items) => {
				const oldIndex = items.findIndex(({ id }) => id === active.id);
				const newIndex = items.findIndex(({ id }) => id === over?.id);

				movedItems = arrayMove(items, oldIndex, newIndex);
				return movedItems;
			});

			console.log(movedItems);
		}
	}

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragEnd={handleDragEnd}
		>
			<SortableContext items={items} strategy={rectSwappingStrategy}>
				{isLoading ? (
					<SkeletonsList
						count={6}
						wrapperClassName="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4"
						className="aspect-[2/1]"
					/>
				) : isError ? (
					<div />
				) : items.length === 0 ? (
					<EmptyContent className="max-h-[50%]" />
				) : (
					<div
						className={cn(
							"animate-with-page-pending",
							"grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4",
						)}
					>
						{items.map(({ id, imageUrl }) => (
							<BannerCard key={id} id={id} imageUrl={imageUrl} />
						))}
					</div>
				)}
			</SortableContext>
		</DndContext>
	);
};
