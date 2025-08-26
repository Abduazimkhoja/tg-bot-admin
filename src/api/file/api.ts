import { API_ENDPOINTS } from "@/constants/api.const";
import { request } from "@/shared/lib/request";
import type {
	CreateFileParams,
	CreateFileResponse,
	DeleteFileParams,
	DeleteFileResponse,
} from "./type";

export const createFiles = async ({ files, token }: CreateFileParams) => {
	const requests = files.map(async (file) => {
		const formData = new FormData();
		formData.append("file", file);

		return await request.post<CreateFileResponse>({
			token,
			endpoints: [API_ENDPOINTS.files],
			body: formData,
			autoToastSuccess: false,
		});
	});

	const responses = await Promise.all(requests);

	return { ...responses[0], data: responses.map(({ data }) => data) };
};

export const deleteFile = ({ fileName }: DeleteFileParams) => {
	return request.delete<DeleteFileResponse>({
		endpoints: [API_ENDPOINTS.files, fileName],
	});
};
