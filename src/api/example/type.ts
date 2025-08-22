import type * as z from "zod";
import type {
	ApiResponse,
	PaginatedApiResponse,
} from "@/api/_api-configs/type";
import type {
	createExampleBodySchema,
	exampleItemSchema,
	updateExampleBodySchema,
} from "./schema";

// data item
export type ExampleItem = z.infer<typeof exampleItemSchema>;

// data list
export type ExamplesList = ExampleItem[];

// HTTPS 🚀

// GetAll 🔵
export type GetAllExamplesResponse = PaginatedApiResponse<
	typeof exampleItemSchema
>;
export type GetAllExamplesParams = {
	searchParams?: {
		query?: string;
	};
};

// GetById 🔵
export type GetByIdExampleResponse = ApiResponse<typeof exampleItemSchema>;
export type GetByIdExampleParams = {
	id: ExampleItem["id"];
};

// Create 🟢
export type CreateExampleResponse = ApiResponse<unknown>;
export type CreateExampleBody = z.infer<typeof createExampleBodySchema>;
export type CreateExampleForm = CreateExampleBody;
export type CreateExampleParams = {
	body: CreateExampleBody;
};

// Update 🟡
export type UpdateExampleResponse = ApiResponse<unknown>;
export type UpdateExampleBody = z.infer<typeof updateExampleBodySchema>;
export type UpdateExampleForm = UpdateExampleBody;
export type UpdateExampleParams = {
	id: ExampleItem["id"];
	body: UpdateExampleBody;
};

// Delete 🔴
export type DeleteExampleResponse = ApiResponse<unknown>;
export type DeleteExampleParams = {
	id: ExampleItem["id"];
};
