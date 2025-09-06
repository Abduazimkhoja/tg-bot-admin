import * as z from "zod";
import { baseEntitySchema } from "../_api-configs/schema";

export const promoCodeItemSchema = baseEntitySchema({
	code: z.string(),
	discountPercent: z.number(),
	maxUsagePerUser: z.number(),
	isActive: z.boolean(),
	createdAt: z.string(),
});

export const promoCodeBodySchema = z.object({
	code: z.string("Введите код").nonempty("Введите код"),
	discountPercent: z
		.number("Введите процент скидки")
		.positive("Число не должно быть отрицательным")
		.min(1, "Минимум 1%")
		.max(100, "Максимум 100%"),
	maxUsagePerUser: z
		.number("Введите кол-во использований")
		.int("Число должно быть целым")
		.positive("Число не должно быть отрицательным"),
	isActive: z.boolean(),
});
