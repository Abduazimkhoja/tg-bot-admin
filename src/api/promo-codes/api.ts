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

export const getAllPromoCodes = ({
	searchParams,
}: GetAllPromoCodesParams = {}) => {
	return request.get<GetAllPromoCodesResponse>({
		endpoints: [API_ENDPOINTS.promoCodes],
		searchParams,
	});
};

export const getByIdPromoCode = ({ id }: GetByIdPromoCodeParams) => {
	return request.get<GetByIdPromoCodeResponse>({
		endpoints: [API_ENDPOINTS.promoCodes, id],
	});
};

export const createPromoCode = ({ body }: CreatePromoCodeParams) => {
	return request.post<CreatePromoCodeResponse>({
		endpoints: [API_ENDPOINTS.promoCodes],
		json: body,
	});
};

export const updatePromoCode = ({ id, body }: UpdatePromoCodeParams) => {
	return request.put<UpdatePromoCodeResponse>({
		endpoints: [API_ENDPOINTS.promoCodes, id],
		json: body,
	});
};

export const deletePromoCode = ({ id }: DeletePromoCodeParams) => {
	return request.delete<DeletePromoCodeResponse>({
		endpoints: [API_ENDPOINTS.promoCodes, id],
	});
};
