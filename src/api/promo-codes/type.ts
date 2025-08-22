import type * as z from "zod";
import type {
	ApiResponse,
	PaginatedApiResponse,
} from "@/api/_api-configs/type";
import type { promoCodeBodySchema, promoCodeItemSchema } from "./schema";

// data item
export type PromoCodeItem = z.infer<typeof promoCodeItemSchema>;

// data list
export type PromoCodesList = PromoCodeItem[];

// HTTPS 🚀

// GetAll 🔵
export type GetAllPromoCodesResponse = PaginatedApiResponse<
	typeof promoCodeItemSchema
>;
export type GetAllPromoCodesParams = {
	searchParams?: {
		query?: string;
	};
};

// GetById 🔵
export type GetByIdPromoCodeResponse = ApiResponse<typeof promoCodeItemSchema>;
export type GetByIdPromoCodeParams = {
	id: PromoCodeItem["id"];
};

// Create 🟢
export type CreatePromoCodeResponse = ApiResponse<unknown>;
export type CreatePromoCodeBody = z.infer<typeof promoCodeBodySchema>;
export type CreatePromoCodeForm = CreatePromoCodeBody;
export type CreatePromoCodeParams = {
	body: CreatePromoCodeBody;
};

// Update 🟡
export type UpdatePromoCodeResponse = ApiResponse<unknown>;
export type UpdatePromoCodeBody = z.infer<typeof promoCodeBodySchema>;
export type UpdatePromoCodeForm = UpdatePromoCodeBody;
export type UpdatePromoCodeParams = {
	id: PromoCodeItem["id"];
	body: UpdatePromoCodeBody;
};

// Delete 🔴
export type DeletePromoCodeResponse = ApiResponse<unknown>;
export type DeletePromoCodeParams = {
	id: PromoCodeItem["id"];
};
