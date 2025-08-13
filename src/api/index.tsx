import ky from "ky";
import { getToken } from "next-auth/jwt";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

// api/index.ts
const baseApi = ky.create({
	prefixUrl: "/api",
	retry: 0,
});

export const api = ky.create({
	prefixUrl: "/api",
	retry: 0,
	hooks: {
		afterResponse: [
			async (request, _options, response) => {
				if (response.status === 401) {
					signOut();
					return;
				}
				if (request.method === "GET") return;

				if (!response.ok) {
					const errorText = await response.text().catch(() => "Ошибка");
					toast.error(`${errorText || response.statusText}`);
				}

				toast.success("Успешно");
			},
		],
	},
});

export const secureApi = api.extend({
	retry: 0,
	hooks: {
		beforeRequest: [
			async (request) => {
				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
				const token = await getToken({ req: request as any });
				request.headers.set("Authorization", `Bearer ${token?.accessToken}`);
			},
		],
	},
});

async function handle(reqFn: () => Promise<Response>, opts: RequestOptions) {
	try {
		const res = await reqFn();

		if (res.status === 401) {
			signOut();
			return;
		}

		const json = await res.json();

		if (!opts.autoToast === false && opts.successMessage) {
			toast.success(opts.successMessage);
		}

		return json;
	} catch (error) {
		if (!opts.autoToast === false) {
			toast.error(opts.errorMessage || "Ошибка запроса");
		}
		throw error;
	}
}

export const request = {
	get: async (url: string, opts: RequestOptions = {}) => {
		return handle(() => baseApi.get(url, opts), opts);
	},

	post: async (url: string, opts: RequestOptions = {}) => {
		return handle(() => baseApi.post(url, opts), opts);
	},

	put: async (url: string, opts: RequestOptions = {}) => {
		return handle(() => baseApi.put(url, opts), opts);
	},

	delete: async (url: string, opts: RequestOptions = {}) => {
		return handle(() => baseApi.delete(url, opts), opts);
	},
};

type RequestOptions = {
	successMessage?: string;
	errorMessage?: string;
	autoToast?: boolean;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	json?: any;
	params?: Record<string, string | number | boolean>;
	headers?: Record<string, string>;
};
