import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay: number): Readonly<T> {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const tick = setTimeout(() => setDebouncedValue(value), delay);

		return () => clearTimeout(tick);
	}, [value, delay]);

	if (delay <= 0) return value;
	return debouncedValue;
}
