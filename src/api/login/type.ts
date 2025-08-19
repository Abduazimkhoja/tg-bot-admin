import type * as z from "zod";
import type { loginBodySchema, loginItemSchema } from "./schema";

export type LoginResponse = z.infer<typeof loginItemSchema>;
export type LoginBody = z.infer<typeof loginBodySchema>;
export type LoginParams = {
	body: LoginBody;
};
