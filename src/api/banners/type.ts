import type * as z from "zod";
import type {
	ApiResponse,
	PaginatedApiResponse,
} from "@/api/_api-configs/type";
import type {
	bannerBodySchema,
	bannerFormSchema,
	bannerItemSchema,
} from "./schema";

// data item
export type BannerItem = z.infer<typeof bannerItemSchema>;

// data list
export type BannersList = BannerItem[];

// body
export type BannersBody = z.infer<typeof bannerBodySchema>;

export type BannersForm = z.infer<typeof bannerFormSchema>;

// HTTPS 🚀

// GetAll 🔵
export type GetAllBannersResponse = PaginatedApiResponse<
	typeof bannerItemSchema
>;
export type GetAllBannersParams = {
	searchParams?: never;
};

// GetById 🔵
export type GetByIdBannerResponse = ApiResponse<typeof bannerItemSchema>;
export type GetByIdBannerParams = {
	id: BannerItem["id"];
};

// Create 🟢
export type CreateBannerResponse = ApiResponse<unknown>;
export type CreateBannerParams = {
	body: BannersBody;
	token: string;
};

// Update 🟡
export type UpdateBannerResponse = ApiResponse<unknown>;
export type UpdateBannerParams = {
	id: BannerItem["id"];
	body: BannersBody;
	token: string;
};

// Delete 🔴
export type DeleteBannerResponse = ApiResponse<unknown>;
export type DeleteBannerParams = {
	id: BannerItem["id"];
	token: string;
};
