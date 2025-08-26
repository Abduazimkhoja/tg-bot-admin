import * as z from "zod";
import {
	idSchema,
	localizedStringSchema,
} from "@/shared/schemas/shared.schema";

// Response Schema
export function apiResponseSchema<T>(dataSchema: T) {
	return z.object({
		data: dataSchema,
		message: localizedStringSchema(),
		statusCode: z.number().int(),
	});
}

// Paginated Response Schema
export function paginatedApiResponseSchema<T extends z.ZodTypeAny>(
	dataSchema: T,
) {
	return z.object({
		data: z.array(dataSchema),
		message: localizedStringSchema(),
		statusCode: z.number().int(),
		pagination: paginationMetaSchema,
	});
}

export function baseEntitySchema<T extends Record<string, z.ZodTypeAny>>(
	fields: T,
) {
	return z.object({
		id: idSchema,
		...fields,
	});
}

// schemas/shared.schema.ts (продолжение)
export const paginationMetaSchema = z.object({
	totalElements: z.number().int().nonnegative(),
	totalPages: z.number().int().nonnegative(),
	perPage: z.number().int().positive(),
	page: z.number().int().positive(),
	from: z.number().int().nonnegative(),
	to: z.number().int().nonnegative(),
});
