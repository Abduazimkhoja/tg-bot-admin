export const removeEmptyKeys = <T extends Record<string, unknown>>(
	object: T,
) => {
	const cleaned: Record<string, unknown> = {};

	for (const key in object) {
		const value = object[key];

		const isInValid =
			value == null ||
			(typeof value === "string" && !value.trim()) ||
			(typeof value === "object" && !Object.keys(value).length);

		if (isInValid) continue;

		cleaned[key] = value;
	}

	return cleaned as T;
};
