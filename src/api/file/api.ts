import { API_ENDPOINTS } from "@/constants/api.const";
import { request } from "@/shared/lib/request";
import type {
	CreateFileParams,
	CreateFileResponse,
	DeleteFileParams,
	DeleteFileResponse,
} from "./type";

export const createFile = ({ body, token }: CreateFileParams) => {
	return request.post<CreateFileResponse>({
		token,
		endpoints: [API_ENDPOINTS.files],
		body,
		autoToastSuccess: false,
	});
};

export const deleteFile = ({ fileName }: DeleteFileParams) => {
	return request.delete<DeleteFileResponse>({
		endpoints: [API_ENDPOINTS.files, fileName],
	});
};
