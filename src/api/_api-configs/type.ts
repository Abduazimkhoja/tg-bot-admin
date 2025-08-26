import type * as z from "zod";
import type {
	apiResponseSchema,
	baseEntitySchema,
	paginatedApiResponseSchema,
} from "./schema";

export type ApiResponse<T> = z.infer<ReturnType<typeof apiResponseSchema<T>>>;

export type PaginatedApiResponse<T extends z.ZodTypeAny> = z.infer<
	ReturnType<typeof paginatedApiResponseSchema<T>>
>;

export type BaseEntity = z.infer<ReturnType<typeof baseEntitySchema>>;
