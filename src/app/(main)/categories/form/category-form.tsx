"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleQuestionMark } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { createCategory, updateCategory } from "@/api/categories/api";
import { categoryFormSchema } from "@/api/categories/schema";
import type { CategoriesForm, CategoryItem } from "@/api/categories/type";
import { createFiles } from "@/api/file/api";
import { ENV } from "@/constants/env.const";
import { findKey } from "@/shared/lib/find-key";
import {
	Button,
	FormField,
	Input,
	Popover,
	SheetClose,
	UploadImage,
} from "@/shared/ui";

export const CategoryForm = ({ category, pending, startTransition }: Props) => {
	const session = useSession();
	const token = session.data?.accessToken || "";
	const router = useRouter();
	const sheetCloseRef = useRef<HTMLButtonElement>(null);

	const {
		handleSubmit,
		control,
		formState: { errors },
		register,
	} = useForm<CategoriesForm>({
		resolver: zodResolver(categoryFormSchema),
		defaultValues: {
			name: category?.name,
			image: category?.image,
		},
	});

	const onSubmit = ({ image, name }: CategoriesForm) => {
		startTransition(async () => {
			let imageUrl = "";

			if (typeof image !== "string") {
				const imageResponse = await createFiles({
					files: [image],
					token,
				});

				imageUrl = imageResponse.data[0].path;
			} else {
				imageUrl = image;
			}

			if (category) {
				await updateCategory({
					id: category.id,
					body: {
						name,
						image: imageUrl,
					},
					token,
				});
			} else {
				await createCategory({
					body: {
						name,
						image: imageUrl,
					},
					token,
				});
			}

			router.refresh();
			sheetCloseRef.current?.click();
		});
	};

	return (
		<>
			<SheetClose ref={sheetCloseRef} className="hidden" />
			<form className="px-5" onSubmit={handleSubmit(onSubmit)}>
				<FormField
					required
					htmlFor="image"
					wrappedLabel={false}
					label={
						<>
							Фото
							<Popover
								triggerProps={{ tabIndex: 0 }}
								label={
									<CircleQuestionMark className="text-gray-400 size-5 ml-2 hover:text-blue-300" />
								}
							>
								Соотношение сторон должно быть 1:1
							</Popover>
						</>
					}
					error={findKey(errors?.image, "message")}
				>
					<Controller
						control={control}
						name="image"
						render={({ field }) => (
							<UploadImage
								onRemove={() => field.onChange(undefined)}
								onChange={field.onChange}
								multiple={false}
								value={field?.value}
							/>
						)}
					/>
				</FormField>

				<FormField
					required
					label="Название (рус)"
					error={findKey(errors?.name, "message")}
				>
					<Input
						{...register("name.ru")}
						placeholder="Название на русском"
						type="text"
					/>
				</FormField>
				<FormField
					required
					label="Название (узб)"
					error={findKey(errors?.name, "message")}
				>
					<Input
						{...register("name.uz")}
						placeholder="Название на узбекском"
						type="text"
					/>
				</FormField>
				<FormField
					required
					label="Название (анг)"
					error={findKey(errors?.name, "message")}
				>
					<Input
						{...register("name.en")}
						placeholder="Название на английском"
						type="text"
					/>
				</FormField>

				<Button
					loading={pending}
					type="submit"
					className="btn-info w-full mt-5"
				>
					Сохранить
				</Button>
			</form>
		</>
	);
};

interface Props {
	pending: boolean;
	startTransition: (callback: () => void) => void;
	category?: CategoryItem;
}
