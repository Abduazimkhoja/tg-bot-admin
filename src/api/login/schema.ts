import * as z from "zod";

export const loginItemSchema = z.object({
	token: z.string().nonempty("Значение должно быть строкой"),
});

export const loginBodySchema = z.object({
	username: z.string().nonempty("Обязательное поле"),
	// .min(5, "Не правильный логин"),
	password: z.string().nonempty("Обязательное поле"),
	// .min(5, "Не правильный пароль"),
});
