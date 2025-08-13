import {
	integer,
	picklist,
	pipe,
	safeParse,
	string,
	toMinValue,
	transform,
} from "valibot";
import {
	PAGINATION_LIMITS,
	PAGINATION_PER_PAGE,
} from "@/constants/pagination.const";

export const perPageParser = (value: string | number) => {
	const parsed = safeParse(
		pipe(
			string(),
			transform(Number),
			integer(),
			toMinValue(PAGINATION_LIMITS[0]),
			picklist(PAGINATION_LIMITS),
		),
		value,
	);

	return parsed.success ? parsed.output : PAGINATION_PER_PAGE;
};
