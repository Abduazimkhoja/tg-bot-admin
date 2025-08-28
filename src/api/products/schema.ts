import * as z from "zod";
import { localizedStringSchema } from "@/shared/schemas/shared.schema";
import { baseEntitySchema } from "../_api-configs/schema";
import { categoryItemSchema } from "../categories/schema";

const skuSchema = z
	.string()
	.min(3, "Минимум 3 символа")
	.max(50, "Максимум 50 символов")
	.regex(/^[A-Z0-9-_]+$/, "Только латиница, цифры, дефис или подчёркивание");

const slugSchema = z
	.string()
	.min(3, "Минимум 3 символа")
	.max(100, "Максимум 100 символов")
	.regex(/^[a-z0-9-]+$/, "Только латиница, цифры и дефис");

export const productItemSchema = baseEntitySchema({
	name: localizedStringSchema(),
	description: localizedStringSchema(),
	category: categoryItemSchema,
	price: z.number(),
	discountPrice: z.number(),
	stock: z.number(),
	slug: slugSchema,
	sku: skuSchema,
	weight: z.number(),
	composition: z.string(),
	isAvailable: z.boolean(),
	images: z.array(z.string()),
});

export const productBodySchema = z.object({
	images: z.array(z.string()),
	name: localizedStringSchema(),
	categoryId: z.number("Выберите категорию"),
	price: z.number("Укажите цену").positive("Цена должна быть больше нуля"),
	sku: skuSchema,
	slug: slugSchema,

	description: localizedStringSchema().partial().optional(),

	stock: z.number().optional(),
	discountPrice: z.number().optional(),
	weight: z.number().optional(),
	composition: z.string().optional(),
	isAvailable: z.boolean().optional(),
});

export const productFormSchema = z.object({
	...productBodySchema.shape,

	images: z
		.array(z.union([z.string(), z.instanceof(File)]), "Загрузите изображение")
		.nonempty("Загрузите изображение")
		.max(10, "Максимум 10 изображений"),

	sku: skuSchema.optional(),
	slug: slugSchema.optional(),
});
