import type * as z from "zod";
import type {
	ApiResponse,
	PaginatedApiResponse,
} from "@/api/_api-configs/type";
import type { bannerBodySchema, bannerItemSchema } from "./schema";

// data item
export type BannerItem = z.infer<typeof bannerItemSchema>;

// data list
export type BannersList = BannerItem[];

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
export type CreateBannerBody = z.infer<typeof bannerBodySchema>;
export type CreateBannerForm = CreateBannerBody;
export type CreateBannerParams = {
	body: CreateBannerBody;
};

// Update 🟡
export type UpdateBannerResponse = ApiResponse<unknown>;
export type UpdateBannerBody = z.infer<typeof bannerBodySchema>;
export type UpdateBannerForm = UpdateBannerBody;
export type UpdateBannerParams = {
	id: BannerItem["id"];
	body: UpdateBannerBody;
};

// Delete 🔴
export type DeleteBannerResponse = ApiResponse<unknown>;
export type DeleteBannerParams = {
	id: BannerItem["id"];
};
