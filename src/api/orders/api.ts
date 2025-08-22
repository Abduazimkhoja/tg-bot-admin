import { API_ENDPOINTS } from "@/constants/api.const";
import { request } from "@/shared/lib/request";
import type {
	CreateOrderParams,
	CreateOrderResponse,
	DeleteOrderParams,
	DeleteOrderResponse,
	GetAllOrdersParams,
	GetAllOrdersResponse,
	GetByIdOrderParams,
	GetByIdOrderResponse,
	UpdateOrderParams,
	UpdateOrderResponse,
} from "./type";

export const getAllOrders = ({ searchParams }: GetAllOrdersParams = {}) => {
	return request.get<GetAllOrdersResponse>({
		endpoints: [API_ENDPOINTS.orders],
		searchParams,
	});
};

export const getByIdOrder = ({ id }: GetByIdOrderParams) => {
	return request.get<GetByIdOrderResponse>({
		endpoints: [API_ENDPOINTS.orders, id],
	});
};

export const createOrder = ({ body }: CreateOrderParams) => {
	return request.post<CreateOrderResponse>({
		endpoints: [API_ENDPOINTS.orders],
		json: body,
	});
};

export const updateOrder = ({ id, body }: UpdateOrderParams) => {
	return request.patch<UpdateOrderResponse>({
		endpoints: [API_ENDPOINTS.orders, id],
		json: body,
	});
};

export const deleteOrder = ({ id }: DeleteOrderParams) => {
	return request.delete<DeleteOrderResponse>({
		endpoints: [API_ENDPOINTS.orders, id],
	});
};
