import { API_ENDPOINTS } from "@/constants/api.const";
import { request } from "@/shared/lib/request";
import type {
	CreateExampleParams,
	CreateExampleResponse,
	DeleteExampleParams,
	DeleteExampleResponse,
	GetAllExampleParams,
	GetAllExampleResponse,
	GetByIdExampleParams,
	GetByIdExampleResponse,
	UpdateExampleParams,
	UpdateExampleResponse,
} from "./type";

export const getAllExample = ({ searchParams }: GetAllExampleParams = {}) => {
	return request.get<GetAllExampleResponse>({
		endpoints: [API_ENDPOINTS.example],
		searchParams,
	});
};

export const getByIdExample = ({ id, searchParams }: GetByIdExampleParams) => {
	return request.get<GetByIdExampleResponse>({
		endpoints: [API_ENDPOINTS.example, id],
		searchParams,
	});
};

export const createExample = ({ body }: CreateExampleParams) => {
	return request.post<CreateExampleResponse>({
		endpoints: [API_ENDPOINTS.example],
		json: body,
	});
};

export const updateExample = ({ id, body }: UpdateExampleParams) => {
	return request.patch<UpdateExampleResponse>({
		endpoints: [API_ENDPOINTS.example, id],
		json: body,
	});
};

export const deleteExample = ({ id }: DeleteExampleParams) => {
	return request.delete<DeleteExampleResponse>({
		endpoints: [API_ENDPOINTS.example, id],
	});
};
