export interface ResponseWithPagination<T> {
	data: T;
	total: number;
	page: number;
	per_page: number;
}

export interface BaseResponse<T> {
	data: T;
	status: number;
	message: {
		en: string;
		ru: string;
	};
}
