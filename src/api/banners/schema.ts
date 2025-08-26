import * as z from "zod";
import { imageFileSchema } from "@/shared/schemas/validation-schemas/image-file-schema";
import { baseEntitySchema } from "../_api-configs/schema";

export const bannerItemSchema = baseEntitySchema({
	imageUrl: z.string(),
});

export const bannerBodySchema = z.object({
	imageUrl: z.string(),
});

export const bannerFormSchema = z.object({
	image: z.union([imageFileSchema, z.string()]),
});
