import { API_ENDPOINTS } from "@/constants/api.const";
import { request } from "@/shared/lib/request";
import type { LoginParams, LoginResponse } from "./type";

export const login = async ({ body }: LoginParams) => {
	return request.post<LoginResponse>({
		endpoints: [API_ENDPOINTS.login],
		json: body,
	});
};
