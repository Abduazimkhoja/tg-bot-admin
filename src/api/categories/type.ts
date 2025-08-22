import type * as z from "zod";
import type {
	ApiResponse,
	PaginatedApiResponse,
} from "@/api/_api-configs/type";
import type { categoryBodySchema, categoryItemSchema } from "./schema";

// data item
export type CategoryItem = z.infer<typeof categoryItemSchema>;

// data list
export type CategoriesList = CategoryItem[];

// HTTPS 🚀

// GetAll 🔵
export type GetAllCategoriesResponse = PaginatedApiResponse<
	typeof categoryItemSchema
>;
export type GetAllCategoriesParams = {
	searchParams?: {
		search?: string;
		page?: number;
		perPage?: number;
	};
};

// GetById 🔵
export type GetByIdCategoryResponse = ApiResponse<typeof categoryItemSchema>;
export type GetByIdCategoryParams = {
	id: CategoryItem["id"];
};

// Create 🟢
export type CreateCategoryResponse = ApiResponse<unknown>;
export type CreateCategoryBody = z.infer<typeof categoryBodySchema>;
export type CreateCategoryForm = CreateCategoryBody;
export type CreateCategoryParams = {
	body: CreateCategoryBody;
};

// Update 🟡
export type UpdateCategoryResponse = ApiResponse<unknown>;
export type UpdateCategoryBody = z.infer<typeof categoryBodySchema>;
export type UpdateCategoryForm = UpdateCategoryBody;
export type UpdateCategoryParams = {
	id: CategoryItem["id"];
	body: UpdateCategoryBody;
};

// Delete 🔴
export type DeleteCategoryResponse = ApiResponse<unknown>;
export type DeleteCategoryParams = {
	id: CategoryItem["id"];
};
