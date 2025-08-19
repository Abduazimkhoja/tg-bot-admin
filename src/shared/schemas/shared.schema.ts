import * as z from "zod";
import { type LocaleCode, localeList } from "../types/locale.type";

export const idSchema = z.number().int().positive();

export function localizedStringSchema() {
	const schema = z.string().nonempty("Значение должно быть строкой");

	const fields = Object.fromEntries(
		localeList.map((locale) => [locale, schema]),
	) as Record<LocaleCode, typeof schema>;

	return z.object(fields);
}
