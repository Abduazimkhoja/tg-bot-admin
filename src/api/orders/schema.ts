import * as z from "zod";
import { idSchema } from "@/shared/schemas/shared.schema";
import { baseEntitySchema } from "../_api-configs/schema";

export const OrderStatus = [
	"New",
	"Processing",
	"Shipped",
	"Delivered",
	"Completed",
	"Cancelled",
] as const;

export type OrderStatus = (typeof OrderStatus)[number];

export const orderPaymentList = ["Cash", "Card"];
export const orderDeliveryList = ["Delivery", "Pickup"];

export const orderItemSchema = baseEntitySchema({
	status: z.enum(Object.values(OrderStatus)),
});

export const createOrderBodySchema = z.object({
	telegramId: idSchema,
	paymentType: z.enum(orderPaymentList),
	deliveryMethod: z.enum(orderDeliveryList),
	promoCode: z.string().optional(),
	address: z.string().optional(),
	latitude: z.number(),
	longitude: z.number(),
	totalSalePrice: z.number(),
	items: z.array(
		z.object({
			productId: idSchema,
			quantity: z.number().int().positive(),
		}),
	),
});

export const updateOrderBodySchema = z.object({
	status: z.enum(Object.values(OrderStatus)),
});
