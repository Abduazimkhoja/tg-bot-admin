import { type TQueryParams, createQueryParams } from "./createQueryParams";
import { type TPath, formatterPaths } from "./formatPaths";

type BuildUrlFunction = (options?: {
	queryParams?: Partial<TQueryParams>;
	endpoints?: TPath[];
}) => Pick<URL, "href" | "pathname" | "search" | "origin"> & { path: string };

type CreateUrlFunction = (config: {
	baseUrl: string;
	basePaths?: TPath[];
}) => BuildUrlFunction;

const initialValues = {
	path: "",
	pathname: "",
	search: "",
	origin: "",
	href: "",
};

export const createUrl: CreateUrlFunction = ({ baseUrl, basePaths }) => {
	return ({ queryParams, endpoints } = {}) => {
		if (!baseUrl) return initialValues;
		const url = new URL(baseUrl);

		const fullPaths = formatterPaths(
			url.pathname.split("/"),
			basePaths,
			endpoints,
		);

		url.pathname = fullPaths;
		url.search = createQueryParams({ queryParams });

		return {
			path: url.pathname + url.search,
			pathname: url.pathname,
			search: url.search,
			origin: url.origin,
			href: url.href,
		};
	};
};

// USE CASE ✏️

// const createUserUrl = createUrl({ baseUrl: '', basePaths: ['category'] });
// const userUrl = createUserUrl({
//   queryParams: { page: 1, size: 10, search: 'query', isActive: true },
//   endpoints: ['users', 10],
// });
// console.log(userUrl.path)
