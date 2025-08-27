import type * as z from "zod";
import type {
	ApiResponse,
	PaginatedApiResponse,
} from "@/api/_api-configs/type";
import type {
	categoryBodySchema,
	categoryFormSchema,
	categoryItemSchema,
} from "./schema";

// data item
export type CategoryItem = z.infer<typeof categoryItemSchema>;

// data list
export type CategoriesList = CategoryItem[];

export type CategoriesBody = z.infer<typeof categoryBodySchema>;
export type CategoriesForm = z.infer<typeof categoryFormSchema>;

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
export type CreateCategoryParams = {
	body: CategoriesBody;
	token: string;
};

// Update 🟡
export type UpdateCategoryResponse = ApiResponse<unknown>;
export type UpdateCategoryParams = {
	id: CategoryItem["id"];
	body: CategoriesBody;
	token: string;
};

// Delete 🔴
export type DeleteCategoryResponse = ApiResponse<unknown>;
export type DeleteCategoryParams = {
	id: CategoryItem["id"];
	token: string;
};
