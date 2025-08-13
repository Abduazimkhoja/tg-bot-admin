import {
	integer,
	pipe,
	safeParse,
	string,
	toMinValue,
	transform,
} from "valibot";

export const pageParser = (value: string | number) => {
	const parsed = safeParse(
		pipe(string(), transform(Number), integer(), toMinValue(1)),
		value,
	);
	return parsed.success ? parsed.output : 1;
};
