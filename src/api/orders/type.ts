import type * as z from "zod";
import type {
	ApiResponse,
	PaginatedApiResponse,
} from "@/api/_api-configs/type";
import type {
	createOrderBodySchema,
	OrderStatus,
	orderItemSchema,
	updateOrderBodySchema,
} from "./schema";

// data item
export type OrderItem = z.infer<typeof orderItemSchema>;

// data list
export type OrdersList = OrderItem[];

// HTTPS 🚀

// GetAll 🔵
export type GetAllOrdersResponse = PaginatedApiResponse<typeof orderItemSchema>;
export type GetAllOrdersParams = {
	searchParams?: {
		TelegramId?: number;
		Status: OrderStatus;
		query?: string;
		From?: string;
		To?: string;
		Search?: string;
		Language?: string;
		Page?: number;
		PageSize?: number;
	};
};

// GetById 🔵
export type GetByIdOrderResponse = ApiResponse<typeof orderItemSchema>;
export type GetByIdOrderParams = {
	id: OrderItem["id"];
};

// Create 🟢
export type CreateOrderResponse = ApiResponse<unknown>;
export type CreateOrderBody = z.infer<typeof createOrderBodySchema>;
export type CreateOrderForm = CreateOrderBody;
export type CreateOrderParams = {
	body: CreateOrderBody;
};

// Update 🟡
export type UpdateOrderResponse = ApiResponse<unknown>;
export type UpdateOrderBody = z.infer<typeof updateOrderBodySchema>;
export type UpdateOrderForm = UpdateOrderBody;
export type UpdateOrderParams = {
	id: OrderItem["id"];
	body: UpdateOrderBody;
	searchParams: {
		status: OrderStatus;
	};
};

// Delete 🔴
export type DeleteOrderResponse = ApiResponse<unknown>;
export type DeleteOrderParams = {
	id: OrderItem["id"];
};
