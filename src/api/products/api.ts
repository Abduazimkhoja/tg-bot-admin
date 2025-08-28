import { API_ENDPOINTS } from "@/constants/api.const";
import { request } from "@/shared/lib/request";
import type {
	CreateProductParams,
	CreateProductResponse,
	DeleteProductParams,
	DeleteProductResponse,
	GetAllProductsParams,
	GetAllProductsResponse,
	GetByIdProductParams,
	GetByIdProductResponse,
	UpdateProductParams,
	UpdateProductResponse,
} from "./type";

export const getAllProducts = ({ searchParams }: GetAllProductsParams = {}) => {
	return request.get<GetAllProductsResponse>({
		endpoints: [API_ENDPOINTS.products],
		searchParams,
	});
};

export const getByIdProduct = ({ id }: GetByIdProductParams) => {
	return request.get<GetByIdProductResponse>({
		endpoints: [API_ENDPOINTS.products, id],
	});
};

export const createProduct = ({ body, token }: CreateProductParams) => {
	return request.post<CreateProductResponse>({
		endpoints: [API_ENDPOINTS.products],
		json: body,
		token,
	});
};

export const updateProduct = ({ id, body, token }: UpdateProductParams) => {
	return request.put<UpdateProductResponse>({
		endpoints: [API_ENDPOINTS.products, id],
		json: body,
		token,
	});
};

export const deleteProduct = ({ id, token }: DeleteProductParams) => {
	return request.delete<DeleteProductResponse>({
		endpoints: [API_ENDPOINTS.products, id],
		token,
	});
};
