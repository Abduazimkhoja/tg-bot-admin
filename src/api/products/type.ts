import type * as z from "zod";
import type {
	ApiResponse,
	PaginatedApiResponse,
} from "@/api/_api-configs/type";
import type { productBodySchema, productItemSchema } from "./schema";

// data item
export type ProductItem = z.infer<typeof productItemSchema>;

// data list
export type ProductsList = ProductItem[];

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
export type CreateProductBody = z.infer<typeof productBodySchema>;
export type CreateProductForm = CreateProductBody;
export type CreateProductParams = {
	body: CreateProductBody;
};

// Update 🟡
export type UpdateProductResponse = ApiResponse<unknown>;
export type UpdateProductBody = z.infer<typeof productBodySchema>;
export type UpdateProductForm = UpdateProductBody;
export type UpdateProductParams = {
	id: ProductItem["id"];
	body: UpdateProductBody;
};

// Delete 🔴
export type DeleteProductResponse = ApiResponse<unknown>;
export type DeleteProductParams = {
	id: ProductItem["id"];
};
