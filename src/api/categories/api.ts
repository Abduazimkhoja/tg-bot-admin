import { API_ENDPOINTS } from "@/constants/api.const";
import { request } from "@/shared/lib/request";
import type {
	CreateCategoryParams,
	CreateCategoryResponse,
	DeleteCategoryParams,
	DeleteCategoryResponse,
	GetAllCategoriesParams,
	GetAllCategoriesResponse,
	GetByIdCategoryParams,
	GetByIdCategoryResponse,
	UpdateCategoryParams,
	UpdateCategoryResponse,
} from "./type";

export const getAllCategories = ({
	searchParams,
}: GetAllCategoriesParams = {}) => {
	return request.get<GetAllCategoriesResponse>({
		endpoints: [API_ENDPOINTS.categories],
		searchParams,
	});
};

export const getByIdCategory = ({ id }: GetByIdCategoryParams) => {
	return request.get<GetByIdCategoryResponse>({
		endpoints: [API_ENDPOINTS.categories, id],
	});
};

export const createCategory = ({ body }: CreateCategoryParams) => {
	return request.post<CreateCategoryResponse>({
		endpoints: [API_ENDPOINTS.categories],
		json: body,
	});
};

export const updateCategory = ({ id, body }: UpdateCategoryParams) => {
	return request.put<UpdateCategoryResponse>({
		endpoints: [API_ENDPOINTS.categories, id],
		json: body,
	});
};

export const deleteCategory = ({ id }: DeleteCategoryParams) => {
	return request.delete<DeleteCategoryResponse>({
		endpoints: [API_ENDPOINTS.categories, id],
	});
};
