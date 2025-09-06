"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useQueryStates } from "nuqs";
import { Controller, type FieldErrors, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { createFiles } from "@/api/file/api";
import { createProduct, updateProduct } from "@/api/products/api";
import { productFormSchema } from "@/api/products/schema";
import type {
	ProductBody,
	ProductForm,
	ProductItem,
} from "@/api/products/type";
import { ROUTES_LIST } from "@/constants/routes-list.const";
import { useTransition } from "@/shared/hooks";
import { searchParamsParsers } from "@/shared/lib/cached-search-params";
import { findKey } from "@/shared/lib/find-key";
import { createQueryParams } from "@/shared/lib/formatters/url-formatter/createQueryParams";
import { requestErrorHandler } from "@/shared/lib/request";
import { Button, FormField } from "@/shared/ui";
import { MultiLangInput } from "@/shared/ui/form/multi-lang-input";
import { PriceInput } from "@/shared/ui/form/price-input";
import { MultiLangSunEditor } from "../../../../shared/ui/form/multiLangSunEditor";
import { CategorySelect } from "./category-select.field";
import { UploadProductImages } from "./upload-product-images.field";

export function ProductsForm({ product }: Props) {
	const [pending, startTransition] = useTransition();
	const session = useSession();
	const token = session.data?.accessToken || "";
	const router = useRouter();
	const [searchParams] = useQueryStates(searchParamsParsers);

	const {
		handleSubmit,
		control,
		formState: { errors },
		register,
		getValues,
	} = useForm<ProductForm>({
		resolver: zodResolver(productFormSchema),
		defaultValues: {
			name: product?.name || {},
			description: {
				ru: !product?.description?.ru ? undefined : product.description.ru,
				en: !product?.description?.en ? undefined : product.description.ru,
				uz: !product?.description?.uz ? undefined : product.description.ru,
			},
			images: product?.images.map((url) => ({ image: url })),
			categoryId: product?.category?.id,
			price: product?.price,
			discountPrice: product?.discountPrice,
			stock: product?.stock,
			sku: product?.sku,
			slug: product?.slug,
			weight: product?.weight,
			composition: product?.composition,
			isAvailable: product?.isAvailable,
		},
	});

	const onSubmit = ({
		images,
		name,
		description,
		categoryId,
		price,
	}: ProductForm) => {
		startTransition(async () => {
			try {
				const imageUrls = images
					.map(({ image }) => image)
					.filter((image) => typeof image === "string");

				const imageFiles = images
					.map(({ image }) => image)
					.filter((image) => image instanceof File);

				if (imageFiles.length) {
					const imageResponse = await createFiles({
						files: imageFiles.map((image) => image),
						token,
					});

					if (!imageResponse.data) return;
					for (const { path } of imageResponse.data) {
						imageUrls.push(path);
					}
				}

				if (product) {
					const body: ProductBody = {
						...product,
						name,
						images: imageUrls,
						categoryId,
						price,
						description: {
							ru: description?.ru || "",
							en: description?.en || "",
							uz: description?.uz || "",
						},
					};

					if (name.en !== product.name.en) {
						body.sku = generateSKU(name.en, product.id);
						body.slug = generateSlug(name.en);
					}

					await updateProduct({
						id: product.id,
						body,
						token,
					});
				} else {
					const body = {
						name,
						images: imageUrls,
						categoryId,
						price,
						description,
						// composition: "",
						// discountPrice: price,
						// isAvailable: true,
						sku: generateSKU(name.en, Math.round(Math.random() * 100)),
						slug: generateSlug(name.en),
						// stock: 10,
						// weight: 10,
					};

					await createProduct({
						body,
						token,
					});
				}

				const formattedSearchParams = createQueryParams({
					queryParams: searchParams,
				});

				router.replace(`${ROUTES_LIST.products}?${formattedSearchParams}`);
				router.refresh();
			} catch (error) {
				const { errorMessage } = await requestErrorHandler(error);
				toast.error(errorMessage.ru);
			}
		});
	};

	const onError = (errors: FieldErrors<ProductForm>) => {
		console.log("errors", errors);
		console.log("getValues", getValues());
	};

	return (
		<form
			id="product-form"
			className="px-5"
			onSubmit={handleSubmit(onSubmit, onError)}
		>
			<UploadProductImages
				control={control}
				error={findKey(errors?.images, "message")}
			/>

			<FormField
				required
				label="Цена"
				error={errors?.price?.message}
				className="w-xs"
			>
				<Controller
					control={control}
					name="price"
					render={({ field }) => (
						<PriceInput placeholder="Введите цену" {...field} />
					)}
				/>
			</FormField>

			<FormField
				required
				label="Категория"
				error={errors?.categoryId?.message}
				className=""
			>
				<CategorySelect control={control} />
			</FormField>

			<MultiLangInput
				className="w-xs"
				required
				register={register}
				placeholder="Введите название"
				label="Название"
				name="name"
				error={errors?.name}
			/>

			<MultiLangSunEditor
				placeholder="Введите описание"
				name="description"
				control={control}
				label="Описание"
				error={errors?.description}
			/>

			<Button
				loading={pending}
				type="submit"
				className="btn-info btn-wide mt-5"
			>
				Сохранить
			</Button>
		</form>
	);
}

interface Props {
	product?: ProductItem;
}

function generateSKU(name: string, id: number | string) {
	return (
		name
			.toUpperCase()
			.replace(/[^A-Z0-9]/g, "-") // оставить только буквы/цифры
			.slice(0, 10) +
		"-" +
		id
	);
}

function generateSlug(name: string) {
	return name
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, "-") // заменяем всё лишнее на дефис
		.replace(/^-+|-+$/g, ""); // убираем дефисы по краям
}
