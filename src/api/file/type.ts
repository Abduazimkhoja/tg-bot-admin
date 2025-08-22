import type * as z from "zod";
import type { ApiResponse } from "@/api/_api-configs/type";
import type { createFileBodySchema, fileItemSchema } from "./schema";

// Create 🟢
export type CreateFileResponse = ApiResponse<typeof fileItemSchema>;
export type CreateFileBody = z.infer<typeof createFileBodySchema>;
export type CreateFileForm = CreateFileBody;
export type CreateFileParams = {
	token: string;
	body: CreateFileBody;
};

// Delete 🔴
export type DeleteFileResponse = ApiResponse<unknown>;
export type DeleteFileParams = {
	fileName: string;
};
