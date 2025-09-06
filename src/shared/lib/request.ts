import ky, { HTTPError, type Options as KyOptions } from "ky";
import { redirect } from "next/dist/server/api-utils";
import { signOut as clientSignOut } from "next-auth/react";
import toast from "react-hot-toast";
import type { ApiResponse } from "@/api/_api-configs/type";
import { signOut as serverSignOut } from "@/auth";
import { ENV } from "@/constants/env.const";
import { ROUTES_LIST } from "@/constants/routes-list.const";
import type { LocalizedString } from "../types/locale.type";
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
		// autoToastError = runtime === "client",
		// autoToastError = false,
		token,
		// suppressError = false,
		...kyOptions
	} = options;

	let searchParams = kyOptions.searchParams;

	if (isPlainObject(searchParams)) {
		searchParams = removeEmptyKeys(searchParams);
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
				successMessage ??
					defaultResponse?.message?.ru ??
					"Операция прошла успешно",
			);
		}

		return data;
	} catch (error) {
		if ((error as HTTPError).response.status === 401) {
			runtime === "client" ? await clientSignOut() : await serverSignOut();
			throw error;
		}

		// if (suppressError) {
		// 	const errorResponse: ApiResponse<null> = {
		// 		data: null,
		// 		statusCode: handledError.statusCode || 555,
		// 		message: isPlainObject(handledError.errorMessage)
		// 			? (handledError.errorMessage as unknown as LocalizedString)
		// 			: {
		// 					ru: handledError.errorMessage,
		// 					uz: handledError.errorMessage,
		// 					en: handledError.errorMessage,
		// 				},
		// 	};

		// 	return Promise.resolve(errorResponse as T);
		// }

		// Пробрасываем ошибку дальше для обработки в react-query
		throw error;
	}
}

export async function requestErrorHandler(error: unknown) {
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

	return {
		errorMessage: isPlainObject(errorMessage)
			? (errorMessage as unknown as LocalizedString)
			: {
					ru: errorMessage,
					uz: errorMessage,
					en: errorMessage,
				},
		statusCode,
	};
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
