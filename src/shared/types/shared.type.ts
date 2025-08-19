import type * as z from "zod";
import type { idSchema } from "../schemas/shared.schema";

export type Id = z.infer<typeof idSchema>;
