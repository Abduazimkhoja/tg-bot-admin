import {
	array,
	boolean,
	minLength,
	number,
	pipe,
	safeParse,
	string,
	transform,
	union,
} from "valibot";

export type TQueryParams = Record<
	string,
	string | number | boolean | string[]
> & {
	page?: number;
	limit?: number;
	sort?: string;
	filter?: string;
	search?: string;
	orderBy?: string;
	order?: "asc" | "desc";
	category?: string;
	tags?: string[];
	startDate?: string;
	endDate?: string;
};

type CreateQueryFunction = (options: {
	queryParams: Partial<TQueryParams> | undefined;
}) => string;

export const createQueryParams: CreateQueryFunction = ({ queryParams }) => {
	if (!queryParams) return "";
	const urlSearchParams = new URLSearchParams();

	for (const [key, value] of Object.entries(queryParams)) {
		const isValidValue = union([
			pipe(string(), minLength(1)),
			boolean(),
			pipe(
				array(union([string(), number(), boolean()])),
				minLength(1),
				transform((arr) => arr.join(",")),
			),
			number(),
		]);

		const result = safeParse(isValidValue, value);

		if (result.success) {
			urlSearchParams.append(key, `${result.output}`);
		}
	}

	return urlSearchParams.toString();
};
