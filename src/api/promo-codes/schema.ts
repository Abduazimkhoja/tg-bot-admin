import * as z from "zod";
import { localizedStringSchema } from "@/shared/schemas/shared.schema";
import { baseEntitySchema } from "../_api-configs/schema";

export const promoCodeItemSchema = baseEntitySchema({
	name: localizedStringSchema(),
});

export const promoCodeBodySchema = z.object({
	name: localizedStringSchema(),
});
