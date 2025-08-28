import type * as z from "zod";
import type {
	ApiResponse,
	PaginatedApiResponse,
} from "@/api/_api-configs/type";
import type {
	productBodySchema,
	productFormSchema,
	productItemSchema,
} from "./schema";

// data item
export type ProductItem = z.infer<typeof productItemSchema>;

// data list
export type ProductsList = ProductItem[];

export type ProductBody = z.infer<typeof productBodySchema>;
export type ProductForm = z.infer<typeof productFormSchema>;

// HTTPS 🚀

// GetAll 🔵
export type GetAllProductsResponse = PaginatedApiResponse<
	typeof productItemSchema
>;
export type GetAllProductsParams = {
	searchParams?: {
		page?: number;
		perPage?: number;
		search?: string;
	};
};

// GetById 🔵
export type GetByIdProductResponse = ApiResponse<typeof productItemSchema>;
export type GetByIdProductParams = {
	id: ProductItem["id"];
};

// Create 🟢
export type CreateProductResponse = ApiResponse<unknown>;
export type CreateProductParams = {
	body: ProductBody;
	token: string;
};

// Update 🟡
export type UpdateProductResponse = ApiResponse<unknown>;
export type UpdateProductParams = {
	id: ProductItem["id"];
	body: ProductBody;
	token: string;
};

// Delete 🔴
export type DeleteProductResponse = ApiResponse<unknown>;
export type DeleteProductParams = {
	id: ProductItem["id"];
	token: string;
};
