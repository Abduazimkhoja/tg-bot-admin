import { API_ENDPOINTS } from "@/constants/api.const";
import { request } from "@/shared/lib/request";
import type {
	CreateBannerParams,
	CreateBannerResponse,
	DeleteBannerParams,
	DeleteBannerResponse,
	GetAllBannersParams,
	GetAllBannersResponse,
	GetByIdBannerParams,
	GetByIdBannerResponse,
	UpdateBannerParams,
	UpdateBannerResponse,
} from "./type";

export const getAllBanners = ({ searchParams }: GetAllBannersParams = {}) => {
	return request.get<GetAllBannersResponse>({
		endpoints: [API_ENDPOINTS.banners],
		searchParams,
	});
};

export const getByIdBanner = ({ id }: GetByIdBannerParams) => {
	return request.get<GetByIdBannerResponse>({
		endpoints: [API_ENDPOINTS.banners, id],
	});
};

export const createBanner = ({ body }: CreateBannerParams) => {
	return request.post<CreateBannerResponse>({
		endpoints: [API_ENDPOINTS.banners],
		json: body,
	});
};

export const updateBanner = ({ id, body }: UpdateBannerParams) => {
	return request.put<UpdateBannerResponse>({
		endpoints: [API_ENDPOINTS.banners, id],
		json: body,
	});
};

export const deleteBanner = ({ id }: DeleteBannerParams) => {
	return request.delete<DeleteBannerResponse>({
		endpoints: [API_ENDPOINTS.banners, id],
	});
};
