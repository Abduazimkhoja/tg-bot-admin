import { API_ENDPOINTS } from "@/constants/api.const";
import { request } from "@/shared/lib/request";
import type {
	CreateExampleParams,
	CreateExampleResponse,
	DeleteExampleParams,
	DeleteExampleResponse,
	GetAllExamplesParams,
	GetAllExamplesResponse,
	GetByIdExampleParams,
	GetByIdExampleResponse,
	UpdateExampleParams,
	UpdateExampleResponse,
} from "./type";

export const getAllExamples = ({ searchParams }: GetAllExamplesParams = {}) => {
	return request.get<GetAllExamplesResponse>({
		endpoints: [API_ENDPOINTS.example],
		searchParams,
	});
};

export const getByIdExample = ({ id }: GetByIdExampleParams) => {
	return request.get<GetByIdExampleResponse>({
		endpoints: [API_ENDPOINTS.example, id],
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
