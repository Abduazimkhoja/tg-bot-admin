import type * as z from "zod";
import type { ApiResponse } from "@/api/_api-configs/type";
import type {
	createFileBodySchema,
	createFileFormSchema,
	fileItemSchema,
} from "./schema";

// Create 🟢
export type CreateFileResponse = ApiResponse<typeof fileItemSchema>;
export type CreateFileBody = z.infer<typeof createFileBodySchema>;
export type CreateFileForm = z.infer<typeof createFileFormSchema>;
export type CreateFileParams = {
	token: string;
	files: CreateFileForm;
};

// Delete 🔴
export type DeleteFileResponse = ApiResponse<unknown>;
export type DeleteFileParams = {
	fileName: string;
};
