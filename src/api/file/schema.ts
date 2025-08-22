import * as z from "zod";

export const fileItemSchema = z.object({
	path: z.string(),
});

export const createFileBodySchema = z.instanceof(FormData);
