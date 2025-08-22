import * as z from "zod";
import { localizedStringSchema } from "@/shared/schemas/shared.schema";
import { baseEntitySchema } from "../_api-configs/schema";
import { categoryItemSchema } from "../categories/schema";

export const productItemSchema = baseEntitySchema({
	name: localizedStringSchema(),
	description: localizedStringSchema(),
	category: categoryItemSchema,
	price: z.number(),
	discountPrice: z.number(),
	stock: z.number(),
	slug: z.string(),
	sku: z.string(),
	weight: z.number(),
	composition: z.string(),
	isAvailable: z.boolean(),
	images: z.array(z.string()),
});

export const productBodySchema = z.object({
	name: localizedStringSchema(),
	description: localizedStringSchema(),

	categoryId: z.number(),
	price: z.number(),
	discountPrice: z.number(),
	stock: z.number(),
	slug: z.string(),
	sku: z.string(),
	weight: z.number(),
	composition: z.string(),
	isAvailable: z.boolean(),
	images: z.array(z.string()),
});
