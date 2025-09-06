import { API_ENDPOINTS } from "@/constants/api.const";
import { request } from "@/shared/lib/request";
import type {
	CreatePromoCodeParams,
	CreatePromoCodeResponse,
	DeletePromoCodeParams,
	DeletePromoCodeResponse,
	GetAllPromoCodesParams,
	GetAllPromoCodesResponse,
	GetByIdPromoCodeParams,
	GetByIdPromoCodeResponse,
	UpdatePromoCodeParams,
	UpdatePromoCodeResponse,
} from "./type";

export const getAllPromoCodes = ({ token }: GetAllPromoCodesParams) => {
	return request.get<GetAllPromoCodesResponse>({
		endpoints: [API_ENDPOINTS.promoCodes],
		token,
	});
};

export const getByIdPromoCode = ({ id, token }: GetByIdPromoCodeParams) => {
	return request.get<GetByIdPromoCodeResponse>({
		endpoints: [API_ENDPOINTS.promoCodes, id],
		token,
	});
};

export const createPromoCode = ({ body, token }: CreatePromoCodeParams) => {
	return request.post<CreatePromoCodeResponse>({
		endpoints: [API_ENDPOINTS.promoCodes],
		json: body,
		token,
	});
};

export const updatePromoCode = ({ id, body, token }: UpdatePromoCodeParams) => {
	return request.put<UpdatePromoCodeResponse>({
		endpoints: [API_ENDPOINTS.promoCodes, id],
		json: body,
		token,
	});
};

export const deletePromoCode = ({ id, token }: DeletePromoCodeParams) => {
	return request.delete<DeletePromoCodeResponse>({
		endpoints: [API_ENDPOINTS.promoCodes, id],
		token,
	});
};
