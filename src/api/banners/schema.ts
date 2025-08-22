import * as z from "zod";
import { baseEntitySchema } from "../_api-configs/schema";

export const bannerItemSchema = baseEntitySchema({
	imageUrl: z.string(),
});

export const bannerBodySchema = z.object({
	imageUrl: z.string(),
});
