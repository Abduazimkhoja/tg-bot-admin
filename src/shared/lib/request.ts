import ky, { HTTPError, type Options as KyOptions } from "ky";
import { signOut as clientSignOut } from "next-auth/react";
import toast from "react-hot-toast";
import type { ApiResponse } from "@/api/_api-configs/type";
import { signOut as serverSignOut } from "@/auth";
import { ENV } from "@/constants/env.const";
import { findKey } from "./find-key";
import type { Paths } from "./formatters/url-formatter/formatPaths";
import { getRuntime } from "./get-runtime";
import { isPlainObject } from "./is-plain-object";
import { removeEmptyKeys } from "./remove-empty-keys";

// Фабрика для создания экземпляра ky с нужным prefixUrl
const kyInstance = ({
	hostKey,
	endpoints,
}: Pick<CustomRequestOptions, "hostKey" | "endpoints">) => {
	return ky.create({
		prefixUrl: ENV[hostKey || "backendUrl"]({ endpoints }).href,
		retry: 0,
	});
};

// Централизованный обработчик запросов
async function handleRequest<T>(
	method: "get" | "post" | "put" | "patch" | "delete",
	options: CustomRequestOptions = {},
): Promise<T> {
	const runtime = getRuntime();

	const {
		hostKey,
		successMessage,
		endpoints,
		// По умолчанию уведомления включены для мутаций и выключены для запросов
		autoToastSuccess = runtime === "client" && method !== "get",
		autoToastError = runtime === "client",
		token,
		...kyOptions
	} = options;

	const searchParams = kyOptions.searchParams;

	if (isPlainObject(searchParams)) {
		removeEmptyKeys(searchParams);
	}

	const api = kyInstance({ hostKey, endpoints });

	if (token) {
		kyOptions.headers = {
			...kyOptions.headers,
			Authorization: `Bearer ${token}`,
		};
	}

	try {
		// ky автоматически парсит JSON и выбрасывает HTTPError при ошибке
		const data = await api[method]("", kyOptions).json<T>();

		const defaultResponse = data as ApiResponse<unknown>;

		if (autoToastSuccess) {
			toast.success(
				successMessage ?? defaultResponse?.message?.ru ?? "Успешно",
			);
		}

		return data;
	} catch (error) {
		if (autoToastError) {
			let errorMessage = "Произошла неизвестная ошибка";
			let statusCode: null | number = null;

			if (error instanceof HTTPError) {
				try {
					// Попытка извлечь сообщение об ошибке из тела ответа
					const errorJson = await error.response.json();

					statusCode = error.response.status;
					errorMessage =
						findKey(errorJson, "message") || `Ошибка ${error.response.status}`;
				} catch {
					statusCode = error.response.status;
					errorMessage = `Ошибка ${error.response.status}: ${error.response.statusText}`;
				}
			} else if (error instanceof Error) {
				errorMessage = error.message;
			}

			if (statusCode === 401) {
				runtime === "client" ? await clientSignOut() : await serverSignOut();
			}
			toast.error(errorMessage);
		}
		// Пробрасываем ошибку дальше для обработки в react-query
		throw error;
	}
}

// Экспортируемый объект с методами API
export const request = {
	get: <T>(options: CustomRequestOptions) => handleRequest<T>("get", options),

	post: <T>(options: CustomRequestOptions) => handleRequest<T>("post", options),

	put: <T>(options: CustomRequestOptions) => handleRequest<T>("put", options),

	patch: <T>(options: CustomRequestOptions) =>
		handleRequest<T>("patch", options),

	delete: <T>(options: CustomRequestOptions) =>
		handleRequest<T>("delete", options),
};

// Улучшенный тип опций, расширяющий стандартные опции ky
export type CustomRequestOptions = KyOptions & {
	hostKey?: keyof typeof ENV;
	endpoints?: Paths;
	successMessage?: string;
	autoToastSuccess?: boolean;
	autoToastError?: boolean;
	token?: string;
};
