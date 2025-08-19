import * as z from "zod";
import { localizedStringSchema } from "@/shared/schemas/shared.schema";
import { baseEntitySchema } from "../_api-configs/schema";

export const exampleItemSchema = baseEntitySchema({
	name: localizedStringSchema(),
});

export const createExampleBodySchema = z.object({
	name: localizedStringSchema(),
});

export const updateExampleBodySchema = z.object({
	name: localizedStringSchema().optional(),
});
