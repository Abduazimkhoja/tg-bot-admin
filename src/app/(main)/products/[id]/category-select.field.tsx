"use client";
import { useQuery } from "@tanstack/react-query";
import { type ComponentProps, useState } from "react";
import { type Control, Controller } from "react-hook-form";
import { getAllCategories } from "@/api/categories/api";
import type { ProductForm } from "@/api/products/type";
import { API_ENDPOINTS } from "@/constants/api.const";
import { Combobox } from "@/shared/ui";

export const CategorySelect = ({ control }: Props) => {
	const [search, setSearch] = useState("");

	const { data, isLoading, isError } = useQuery({
		queryKey: [API_ENDPOINTS.categories],
		queryFn: async () => {
			const { data } = await getAllCategories({
				searchParams: { perPage: 999 },
			});

			return data.map(
				({ id, name }): ComponentProps<typeof Combobox>["items"][number] => ({
					value: String(id),
					label: name?.ru,
					keywords: Object.values(name),
				}),
			);
		},
	});

	return (
		<Controller
			control={control}
			name="categoryId"
			render={({ field }) => (
				<Combobox
					placeholder="Выберите категорию"
					loading={isLoading}
					onSearchChange={setSearch}
					search={search}
					items={data || []}
					onChange={(value) =>
						field.onChange(value ? Number(value) : undefined)
					}
					value={field.value?.toString()}
				/>
			)}
		/>
	);
};

interface Props {
	control: Control<ProductForm>;
}
