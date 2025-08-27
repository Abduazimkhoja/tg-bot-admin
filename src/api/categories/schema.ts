import * as z from "zod";
import { localizedStringSchema } from "@/shared/schemas/shared.schema";
import { imageFileSchema } from "@/shared/schemas/validation-schemas/image-file-schema";
import { baseEntitySchema } from "../_api-configs/schema";

export const categoryItemSchema = baseEntitySchema({
	name: localizedStringSchema(),
	image: z.string().optional(),
});

export const categoryBodySchema = z.object({
	name: localizedStringSchema(),
	image: z.string().optional(),
});

export const categoryFormSchema = z.object({
	name: localizedStringSchema(),
	image: z.union([imageFileSchema, z.string()]),
});
